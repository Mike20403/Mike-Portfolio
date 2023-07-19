import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-timelines',
  templateUrl: './timelines.component.html',
  styleUrls: ['./timelines.component.css'],
})
export class TimelinesComponent {
  onEmit(event: { visible: boolean; ref: ElementRef }) {
    console.log('Visible: ', event.visible);

    if (event.visible) {
      // event.ref.nativeElement.style.opacity = 1;
      if (event.ref.nativeElement.classList.contains('right')) {
        event.ref.nativeElement.classList.add('bounce-in-right');
      } else {
        event.ref.nativeElement.classList.add('bounce-in-left');
      }
    }
  }
}
