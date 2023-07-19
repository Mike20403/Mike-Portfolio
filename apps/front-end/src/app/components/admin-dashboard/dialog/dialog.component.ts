import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  template: `<h1 mat-dialog-title>Delete post?</h1>
  <div mat-dialog-content>
    Would you like to delete this post?
  </div>
  <div mat-dialog-actions class="action">
    <button mat-button mat-dialog-close>No</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Ok</button>
  </div>`,
  styles: [`
    button {
    margin-right: 8px;
  }
   .action {
     justify-content: right !important;
   }

  `],
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

}
