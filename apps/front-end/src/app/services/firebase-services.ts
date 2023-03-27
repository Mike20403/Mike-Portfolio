import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ErrorService } from './errors.service';
import { finalize, Observable, Subject } from 'rxjs';
import { AvatarUpload } from '../components/models/avatar-upload';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  imageChanged = new Subject<any>();
  downloadURL?: Observable<string>;
  private basePath = '/avatar';

  constructor(
    private storage: AngularFireStorage,
    private errorService: ErrorService,
    private database: AngularFireDatabase
  ) {}

  pushImagetoStorage(file: File) {
    if (file) {
      const fileType = file.type.toString();
      const fileExtension = fileType.substring(fileType.lastIndexOf('/') + 1);
      const filePath = `${this.basePath}/avatar.${fileExtension}`;
      const fileRef = this.storage.ref(filePath);
      const uploadPercentage = this.storage
        .upload(filePath, file)
        .percentageChanges();
      const task = this.storage.upload(filePath, file);
      // Get downloadURL when upload process is finished
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe((URL: string) => {
              const avtObj = new AvatarUpload(
                file.name,
                new Date().getDate().toString(),
                URL,
                fileExtension
              );
              this.database.object('avatar').set(avtObj);
            });
          })
        )
        .subscribe();

      return uploadPercentage;
    } else {
      return;
    }
  }

  getImagefromStorage() {
    return this.database.object('avatar').snapshotChanges();
  }
}
