import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-post-editor',
  template: `
    <div class="wrapper " >

        <h1 class="bg-warning text-white fw-bold " mat-dialog-title>Create a post </h1>



      <div class="container p-4">
        <app-editor [postData]="data.post" [isEdited]="data.isEdited"></app-editor>
      </div>

    </div>
    `,
  styles: [`.mdc-dialog__title  {
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 100000;
  }`],
})
export class PostEditorComponent {
  constructor(public dialogRef: MatDialogRef<PostEditorComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {

  }
}
