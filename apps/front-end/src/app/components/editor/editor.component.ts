import {Component, EventEmitter, Renderer2, ViewChild} from '@angular/core';

import {BlurEvent, ChangeEvent, FocusEvent} from "@ckeditor/ckeditor5-angular";

import { v4 as uuidv4 } from 'uuid';
import * as CustomEditor from "apps/front-end/src/ckeditor5/build/ckeditor"
import  ClassicEditor from "@ckeditor/ckeditor5-build-classic"

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CustomUploadAdapter } from "../../services/UploadImageAdapter";
import ImageRemoveEventCallbackPlugin from 'apps/front-end/src/ckeditor5/build/ckeditor';
import {getDownloadURL} from "@angular/fire/storage";
import {UploadTask, UploadTaskSnapshot} from "@angular/fire/compat/storage/interfaces";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  @ViewChild('editor') editorComponent: any;
  constructor(private storage:AngularFireStorage,private renderer2:Renderer2){}
  public Editor = CustomEditor;
  public editorConfig = {};
  public imageUploadEvent = new EventEmitter<string>();
  public downloadUrls:string[] = [];
  public componentEvents: string[] = [];
  postData = { title: '', content: '' };
  ngOnInit(): void {

    this.editorConfig = {...CustomEditor.defaultConfig,
   //  extraPlugins: [ImageRemoveEventCallbackPlugin],
   //  imageRemoveEvent: {
   //   additionalElementTypes: null,
   //   callback: this.handleImageRemoveEvent.bind(this)
   // }
 };


}
// private customUploadAdapterPlugin(editor:any) {
//   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//       // Create and return an instance of your custom upload adapter
//     return new CustomUploadAdapter(loader,this.storage);
//   };
// }


// onChange(event: ChangeEvent): void {
//   debugger
//   this.componentEvents.push('Editor model changed.');
// }
//
// onFocus(event: FocusEvent): void {
//   this.componentEvents.push('Focused the editing view.');
// }
//
// onBlur(event: BlurEvent): void {
//   this.componentEvents.push('Blurred the editing view.');
// }
// deleteImage(imagePath: string) {
//   const ref = this.storage.ref(imagePath);
//   ref.delete().subscribe(
//     () => {
//       console.log('Image deleted successfully');
//     },
//     (error) => {
//       console.error('Error deleting image:', error);
//     }
//     );
// }
public handleImageRemoveEvent(imagesSrc: string[], nodeObjects: any[]): void {

  console.log('Callback called', imagesSrc, nodeObjects);

}
// onReady(editor:any){
//   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//       // Create and return an instance of your custom upload adapter
//     return new CustomUploadAdapter(loader,this.storage);
//   };
//
// }
onFileChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files![0] ;

  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = reader.result as string;
    console.log(dataUrl);
    const imgElement = `<img src="${dataUrl}" alt="Uploaded Image">`;
    this.postData.content += imgElement;
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
  const uploadTasks:any = [];

  for (const base64Image of base64Images) {

    if (base64Image.startsWith('data')){
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
getEditorImageUrls():string[] {
  const imgElements = document.createElement('div');
  imgElements.innerHTML = this.postData.content;
  const imgTags = imgElements.querySelectorAll('img');

  const imageUrls:string[] = Array.from(imgTags).map((img: any) => img.src);
  return imageUrls;
}
replaceImgTagsWithUrls(urls: string[]): void {

  const imgElements = document.createElement('div');
  imgElements.innerHTML = this.postData.content;
  const downloadUrls:string[] = urls;
  console.log(downloadUrls)
  const imgTags = imgElements.getElementsByTagName('img');
  let  cnt = -1;

  for (let i = 0; i < imgTags.length; i++) {

    const imgTag = imgTags[i];
    console.log('URL: ',urls[i]);
    if (imgTag.src.startsWith('data:')){
      cnt++;
      this.renderer2.setAttribute(imgTag,'src',urls[cnt]);
    }

  }
  console.log(imgElements.innerHTML);
  this.postData.content = imgElements.innerHTML;
}
savePost() {

    // Xử lý lưu bài post vào cơ sở dữ liệu hoặc xử lý theo nhu cầu của bạn
  const urls:string[] = this.getEditorImageUrls();
  const downloadUrls:string[] = [];
  this.uploadImages(urls)
  .then((uploadtasks:UploadTaskSnapshot[]) => {
    const promiseArray: Promise<string>[] = uploadtasks.map((uploadTask: UploadTaskSnapshot) => {
      return uploadTask.task.snapshot.ref.getDownloadURL();
    });

    return Promise.all(promiseArray);

  }).then((urls: string[]) => {
    downloadUrls.push(...urls);
    console.log('Download URLs:', downloadUrls);
    this.replaceImgTagsWithUrls(downloadUrls);
    console.log('Images uploaded successfully.');
  })
    .catch((error) => {
      // Handle error
    });

  console.log(this.postData.content);

  this.resetEditor();
}

resetEditor(){
    this.postData.content='';
    this.postData.title='';
}
}
