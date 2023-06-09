
import { AngularFireStorage} from '@angular/fire/compat/storage';

export class CustomUploadAdapter {
  private loader: any;
  private imagePath = '/uploadimg'


  constructor(private loaderr: any,  private storage:AngularFireStorage) {
    this.loader = loaderr;
  }
  upload(file: File): Promise<string> {
    return this.loader.file
      .then (file => {

        return new Promise( ( resolve, reject ) => {
          const filePath = `${this.imagePath}/${Date.now()}_${file.name}`;

          const fileRef = this.storage.ref(filePath);

          const task = this.storage.upload(filePath, file).then((data) => {
            fileRef.getDownloadURL().subscribe((url:string) => {
              console.log(url);
              resolve({default:url});
            })
          }).catch((error) => {
            console.log(error);
            reject(error);
          })



        } );

      })
  }



  abort(): void {
    // Implement abort logic if necessary
  }
}
