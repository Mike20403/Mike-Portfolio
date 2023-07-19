import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { Post } from '../blog-page/modals/post';
import * as Editor from 'ckeditor5/build/ckeditor';
import { BlogService } from '../blog-page/blog-service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { PostDetailDialogComponent } from '../blog-page/Post/post-detail-dialog.component';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AppState } from '../admin-dashboard/admin-auth/app-reducers';
import { Store } from '@ngrx/store';
import * as PostAction from '../blog-page/Post/post.actions';
import {PostEditorComponent} from "../admin-dashboard/post-editor/post-editor.component";
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @ViewChild('ckeditor') customeditor: any;
  @ViewChild('postCoverImg') postCover: any;
  constructor(
    public dialogRef: MatDialogRef<PostEditorComponent>,
    private storage: AngularFireStorage,
    private renderer2: Renderer2,
    private postService: BlogService,
    private dialog: MatDialog,
    private store: Store<AppState>,

  ) {}
  public Editor = Editor;
  newEditor: any;
  public editorConfig = {};
  title: string = '';
  isDisabled: boolean = false;
  hasCoverImg: boolean = false;
  nextId: number = 0;
  _item!: Array<any>;
  post!: Post | null;
  postCoverURL!: string;
  @Input() isEdited: boolean = false;
  @Input() postData: Post = {
    _id: {} as number,
    _title: '',
    _article: '',
    _hashtag: [] as string[],
    _preface: '',
    _content: '',
    _imgURL: '',
  };

  // Mat Chips init
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);
  ngOnInit(): void {
    this.postData = { ...this.postData };
    this.postData._content = this.postData._title + this.postData._content;
    this.postCoverURL = this.postData._imgURL;
    this.editorConfig = { ...Editor.defaultConfig };
    // Get next id
    this.store.select('posts').subscribe((state) => {
      if (state.posts.length > 0) {
        this.nextId = state.posts[state.posts.length - 1]._id + 1;
      }
    });
  }
  updatePost() {

    // Xử lý lưu bài post vào cơ sở dữ liệu hoặc xử lý theo nhu cầu của bạn
    const urls: string[] = this.getEditorImageUrls();

    if (urls.length > 0) {
      const downloadUrls: string[] = [];
      this.uploadImages(urls)
        .then((uploadtasks: UploadTaskSnapshot[]) => {
          const promiseArray: Promise<string>[] = uploadtasks.map(
            (uploadTask: UploadTaskSnapshot) => {
              return uploadTask.task.snapshot.ref.getDownloadURL();
            }
          );

          return Promise.all(promiseArray);
        })
        .then((urls: string[]) => {
          downloadUrls.push(...urls);

          this.replaceImgTagsWithUrls(downloadUrls);
          console.log('Download URLs:', downloadUrls);
          console.log('Images uploaded successfully.');
          // Reset the editor content with the img URL uploaded
          this.customeditor.editorInstance.data.set(this.postData._content);

          const parseData = this.parseString(
            this.customeditor.editorInstance.getData()
          );
          this.postData._title = parseData.titleValue;
          this.postData._content = parseData.content;
          this.postData._imgURL = this.postCoverURL;
          this.store.dispatch(
            new PostAction.UpdatePosts({
              id: this.postData?._id,
              post: {...this.postData},
            })
          );
          this.resetEditor();
          this.dialogRef.close()
        })
        .catch((error) => {
          // Handle error
        });
    }


  }
  parseString(input: string): {
    title: string;
    content: string;
    contentValue: string;
    titleValue: string;
  } {
    const regex = /(<h1\b[^>]*>)(.*?)(<\/h1>)/i;
    const match = input.match(regex);
    let title = '';
    let content = '';
    let titleValue = '';
    let contentValue = '';
    if (match && match.length > 0) {
      titleValue = match[2].trim();
      title = match[0].trim();
      content = input.replace(match[0], '').trim();
    } else {
      content = input.trim();
    }
    // Remove HTML tags from the content value
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(content, 'text/html');
    const plainContent = htmlDoc.body.textContent || '';
    contentValue = plainContent.trim();
    return { title, content, contentValue, titleValue };
  }
  onPreview() {
    const parseData = this.parseString(
      this.customeditor.editorInstance.getData()
    );
    this.title = parseData.titleValue;
    this.postData._preface = parseData.contentValue;
    this.postData._content = parseData.content;
    this.post = new Post(
      this.postService.posts.length,
      this.title,
      this.postData._hashtag,
      this.postData._article,
      this.postData._preface,
      parseData.content,
      this.postCoverURL
    );
    this.post = new Post(
      this.nextId,
      this.title,
      this.postData._hashtag,
      this.postData._article,
      this.postData._preface,
      this.postData._content,
      this.postCoverURL
    );

   this.dialog.open(PostDetailDialogComponent, { data: this.post });
  }
  onSelect(value: string) {
    this.postData._article = value;
  }

  onReady(editor: any) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
    this.newEditor = editor;
  }
  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files![0];
    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = reader.result as string;
      const imgElement = `<img src="${dataUrl}" alt="Uploaded Image">`;
      // this.postData.content += imgElement;
      this.postCoverURL = dataUrl;
      this.hasCoverImg = true;
    };

    reader.readAsDataURL(file);
  }

  base64ToBlob(base64: string) {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }
  uploadImages(base64Images: string[]) {
    const storageRef = this.storage.ref('');
    const uploadTasks: any = [];

    for (const base64Image of base64Images) {
      if (base64Image.startsWith('data')) {
        const imageBlob = this.base64ToBlob(base64Image);
        const uniqueName = new Date().getTime().toString();
        const imageRef = storageRef.child(`uploadimg/${uniqueName}.jpg`);
        const uploadTask = imageRef.put(imageBlob);
        uploadTasks.push(uploadTask);
      }
    }
    // Wait for all the upload tasks to complete
    return Promise.all(uploadTasks);
  }
  getEditorImageUrls(): string[] {
    const imgElements = document.createElement('div');
    imgElements.innerHTML = this.postData._content;
    const imgTags = imgElements.querySelectorAll('img');
    const imageUrls: string[] = Array.from(imgTags).map((img: any) => img.src);
    imageUrls.push(this.postCoverURL);
    console.log(imageUrls);
    return imageUrls;
  }
  replaceImgTagsWithUrls(urls: string[]): void {
    const imgElements = document.createElement('div');
    imgElements.innerHTML = this.postData._content;
    const downloadUrls: string[] = urls;
    const imgTags = imgElements.getElementsByTagName('img');
    let cnt = -1;

    for (let i = 0; i < imgTags.length; i++) {
      const imgTag = imgTags[i];
      console.log(imgTag);
      if (imgTag.src.startsWith('data:')) {
        cnt++;
        this.renderer2.setAttribute(imgTag, 'src', urls[cnt]);
      }
    }
    if (this.hasCoverImg && cnt == urls.length - 1 || this.postCoverURL.startsWith('data:')) {
      this.postCoverURL = urls[urls.length - 1];
    }
  console.log(imgElements);
    this.postData._content = imgElements.innerHTML;
  }
  savePost() {
    // Xử lý lưu bài post vào cơ sở dữ liệu hoặc xử lý theo nhu cầu của bạn
    const urls: string[] = this.getEditorImageUrls();

    if (urls.length > 0) {
      const downloadUrls: string[] = [];
      this.uploadImages(urls)
        .then((uploadtasks: UploadTaskSnapshot[]) => {
          const promiseArray: Promise<string>[] = uploadtasks.map(
            (uploadTask: UploadTaskSnapshot) => {
              return uploadTask.task.snapshot.ref.getDownloadURL();
            }
          );

          return Promise.all(promiseArray);
        })
        .then((urls: string[]) => {
          downloadUrls.push(...urls);

          this.replaceImgTagsWithUrls(downloadUrls);
          console.log('Download URLs:', downloadUrls);
          console.log('Images uploaded successfully.');
          this.customeditor.editorInstance.data.set(this.postData._content);
          if (!this.post) {
            const parseData = this.parseString(
              this.customeditor.editorInstance.getData()
            );
            this.title = parseData.titleValue;
            this.postData._preface = parseData.contentValue;
            this.postData._content = parseData.content;
            this.post = new Post(
              this.nextId,
              this.title,
              this.postData._hashtag,
              this.postData._article,
              this.postData._preface,
              this.postData._content,
              this.postCoverURL
            );
          }
          this.store.dispatch(new PostAction.AddPosts(this.post));
          this.resetEditor();
        })
        .catch((error) => {
          // Handle error
        });
    }
  }

  resetEditor() {
    this.post = null;
    this.postData._content = '';
    this.postData._title = '';
    this.postData._imgURL = '';
    this.postData._hashtag = [];
    this.postData._preface = '';
    this.postData._article = '';
    this.postCoverURL = 'https://dummyimage.com/900x400/ced4da/6c757d.jpg';
    this.postCover.nativeElement.value = '';
    this.hasCoverImg = false;
  }

  remove(hashtag: string) {
    const index = this.postData._hashtag.indexOf(hashtag);

    if (index >= 0) {
      this.postData._hashtag.splice(index, 1);

      this.announcer.announce(`Removed ${hashtag}`);
    }
  }

  edit(hashtag: string, $event: MatChipEditedEvent) {
    const value = $event.value.trim();

    // Remove hashtag if it no longer has a name
    if (!value) {
      this.remove(hashtag);
      return;
    }

    // Edit existing fruit
    const index = this.postData._hashtag.indexOf(hashtag);
    if (index >= 0) {
      this.postData._hashtag[index] = value;
    }
  }

  add($event: MatChipInputEvent) {
    const value = ($event.value || '').trim();

    // Add our fruit
    if (value) {
      this.postData._hashtag.push(value);
    }

    // Clear the input value
    $event.chipInput!.clear();
  }
}
