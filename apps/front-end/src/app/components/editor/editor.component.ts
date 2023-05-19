import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BlurEvent, ChangeEvent, FocusEvent} from "@ckeditor/ckeditor5-angular";
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  constructor(){}
  public Editor = ClassicEditor;
  public editorConfig = {};
  public componentEvents: string[] = [];
  postData = { title: '', content: '' };
  ngOnInit(): void {
    this.editorConfig = {
      toolbar: {
        items: ['heading', '|', 'bold', 'italic', '|', 'bulletedList',
          'numberedList', '|', 'insertTable', '|', 'undo', 'redo', 'imageUpload',
          ' classicEditor', 'blockQuote', 'list', 'mediaEmbed', 'pasteFromOffice',
          'fontFamily', 'todoList', 'youtube'
        ]
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
      },
    };
  }

  onChange(event: ChangeEvent<ClassicEditor>): void {
    debugger
    console.log(event.editor);
    this.componentEvents.push('Editor model changed.');
  }

  onFocus(event: FocusEvent<ClassicEditor>): void {
    this.componentEvents.push('Focused the editing view.');
  }

  onBlur(event: BlurEvent<ClassicEditor>): void {
    this.componentEvents.push('Blurred the editing view.');
  }
  savePost() {
    // Xử lý lưu bài post vào cơ sở dữ liệu hoặc xử lý theo nhu cầu của bạn
  }
}
