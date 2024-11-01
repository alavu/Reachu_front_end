// // src/app/services/image-upload.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class ImageUploadService {

//   private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/your_cloud_name/upload'; // Replace with your Cloudinary URL
//   private uploadPreset = 'your_upload_preset'; // Replace with your Cloudinary upload preset

//   constructor(private http: HttpClient) {}

//   uploadImage(file: File, folder: string): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', this.uploadPreset);
//     formData.append('folder', folder); // Optional: specify folder in Cloudinary

//     return this.http.post(this.cloudinaryUrl, formData).pipe(
//       catchError(this.handleError)
//     );
//   }

//   private handleError(error: HttpErrorResponse) {
//     console.error('Error uploading image:', error);
//     return throwError(() => new Error('Error uploading image. Please try again later.'));
//   }
// }
