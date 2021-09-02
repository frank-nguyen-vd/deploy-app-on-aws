import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url = 'http://imageapi-env.eba-q4ixnidc.us-east-1.elasticbeanstalk.com';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  imageBaseUrl = `${url}/files`;
  constructor(private http: HttpClient) {}

  getPhotoNames(): Observable<string[]> {
    return this.http.get<string[]>(this.imageBaseUrl);
  }

  getPhoto(name: string): string {
    return `${this.imageBaseUrl}/download?file=${name}`;
  }
}
