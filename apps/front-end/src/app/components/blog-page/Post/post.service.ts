import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../modals/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) {
  }
  getEditorImageUrls(post:Post): string[] {
    const imgElements = document.createElement('div');
    imgElements.innerHTML = post._content;
    const imgTags = imgElements.querySelectorAll('img');
    const imageUrls: string[] = Array.from(imgTags).map((img: any) => img.src);
    imageUrls.push(post._imgURL);
    console.log(imageUrls);
    return imageUrls;
  }
  deleteImagesFromStorage(urls: string[]): void {
    urls.forEach((url) => {
      this.deleteImage(url);
    });
  }

  deleteImage(url: string): void {
    this.http.delete(url)
      .subscribe(
        () => {
          console.log('Image deleted successfully:', url);
        },
        (error) => {
          console.error('Error deleting image:', url, error);
        }
      );
  }
}
