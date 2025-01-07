import { HttpClient } from '@angular/common/http';

export class CustomUploadImage {
  fileObject: File;
  http: HttpClient;
  url: string;

  constructor(fileObject: File, http: HttpClient, url: string) {
    this.fileObject = fileObject;
    this.http = http;
    this.url = url;
  }

  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.fileObject) {
        const data = new FormData();
        data.append('file', this.fileObject);

        this.http.post(this.url, data).subscribe({
          next: (response: any) => {
            resolve(response.url);
          },
          error: (err) => {
            console.error('Error uploading file:', err);
            reject(err);
          }
        });
      } else {
        reject('No file to upload');
      }
    });
  }

  abort() {}
}
