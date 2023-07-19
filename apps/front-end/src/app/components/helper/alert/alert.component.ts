import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-alert',
  template: `
    <div class="position-absolute w-100 text-center alert alert-success fw-bold" role="alert"
         style="z-index: 999999;background:yellowgreen;color: white; margin-top: 3%" [@fadeInOut]
         *ngIf="show" role="alert">
      {{ message }}
    </div>
  `,
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class AlertComponent {
  @Input() type!: string;
  @Input() message!: string;
  show = false;
onTimeout(){
  this.show = true;
  setTimeout(() => {
    this.show = false;
  }, 1000); // Timeout value in milliseconds (5 seconds in this example)
}
  ngOnInit() {


  }
}
