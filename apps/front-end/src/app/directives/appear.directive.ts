import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { fromEvent, startWith, Subscription } from 'rxjs';

@Directive({
  selector: '[appear]',
})
export class AppearDirective implements AfterViewInit, OnDestroy {
  @Output()
  appear!: EventEmitter<{ visible: boolean; ref: ElementRef }>;
  elementPos!: number;
  elementHeight!: number;
  scrollPos!: number;
  windowHeight!: number;
  subscriptionScroll!: Subscription;
  subscriptionResize!: Subscription;

  constructor(private element: ElementRef) {
    this.appear = new EventEmitter<{ visible: boolean; ref: ElementRef }>();
  }

  saveDimensions() {
    this.elementPos = this.getOffsetTop(this.element.nativeElement);
    this.elementHeight = this.element.nativeElement.offsetHeight;
    this.windowHeight = window.innerHeight;
  }

  getOffsetTop(element: any) {
    // Lấy khoảng cách giữa top element con với top của screen/top của element cha (nếu có)
    let offsetTop = element.offsetTop || 0;
    //Nếu có cha
    if (element.offsetParent) {
      offsetTop += this.getOffsetTop(element.offsetParent);
    }

    return offsetTop;
  }

  isVisible() {
    return (
      (this.scrollPos >= this.elementPos ||
        this.scrollPos + this.windowHeight >=
          this.elementPos + this.elementHeight / 2) &&
      this.scrollPos +
        this.windowHeight -
        (this.elementPos + this.elementHeight / 2) <=
        this.windowHeight
    );
  }

  saveScrollPos() {
    this.scrollPos = window.scrollY;
    console.log('[onScroll]:', this.scrollPos);
  }

  checkVisibility() {
    if (this.isVisible()) {
      //   double check dimensions (due to async loaded contents, e.g. images)
      this.saveDimensions();
      if (this.isVisible()) {
        this.appear.emit({ visible: true, ref: this.element });
      } else {
        this.appear.emit({ visible: false, ref: this.element });
      }
    } else {
      this.appear.emit({ visible: false, ref: this.element });
    }
  }

  subscribe() {
    // Bắt sự kiện scroll khi component dc init xong trong afterViewInit
    this.subscriptionScroll = fromEvent(window, 'scroll')
      .pipe(startWith(null))
      .subscribe(() => {
        this.saveScrollPos();
        this.checkVisibility();
      });
    this.subscriptionResize = fromEvent(window, 'resize')
      .pipe(startWith(null))
      .subscribe(() => {
        this.saveDimensions();
        this.checkVisibility();
      });
  }

  unsubscribe() {
    if (this.subscriptionScroll) {
      this.subscriptionScroll.unsubscribe();
    }
    if (this.subscriptionResize) {
      this.subscriptionResize.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
