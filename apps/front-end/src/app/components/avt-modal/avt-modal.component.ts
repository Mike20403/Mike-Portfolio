import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FirebaseService } from '../../services/firebase-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-avt-modal',
  templateUrl: './avt-modal.component.html',
  styleUrls: ['./avt-modal.component.css'],
})
export class AvtModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('avatarImg', { static: true }) avatarImgElement!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() photo!: string;
  file?: File;
  uploadProgress$?: Observable<number | undefined> | null;
  isCompleted: boolean = false;
  modalListener: any;

  constructor(
    private firebaseService: FirebaseService,
    private renderer2: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.modalListener = this.renderer2.listen(
      this.modal.nativeElement,
      'hidden.bs.modal',
      () => {
        this.isCompleted = false;
        this.uploadProgress$ = null;
        this.fileInput.nativeElement.value = '';
        this.avatarImgElement.nativeElement.src = '';
      }
    );
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  onSubmit() {
    this.isCompleted = false;
    if (this.file) {
      this.uploadProgress$ = this.firebaseService.pushImagetoStorage(this.file);
      this.uploadProgress$?.subscribe((statesnapshot: any) => {
        if (statesnapshot === 100) {
          this.isCompleted = true;
          this.firebaseService.imageChanged.next('');
        }
      });
    } else {
    }
  }

  addPhotoAndReset(event: any) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.avatarImgElement.nativeElement.src = fileReader.result;
    };
    console.log(event.target.files[0]);

    if (event.target.files[0]) {
      this.file = event.target.files[0];
      fileReader.readAsDataURL(event.target.files[0]);
    } else {
      this.avatarImgElement.nativeElement.src = '';
    }
    this.uploadProgress$ = null;
  }
}
