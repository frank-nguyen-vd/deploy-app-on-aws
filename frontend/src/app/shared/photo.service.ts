import { Injectable } from '@angular/core';
import { Photo } from '../models/photo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    imageBaseUrl = 'http://localhost:3000/api/v1/images';
    constructor(private http: HttpClient) {}

    getPhotoNames(): Observable<Photo[]> {
        return this.http.get<Photo[]>(this.imageBaseUrl);
    }

    getPhotoWithSize(
        name: string,
        width: number = 0,
        height: number = 0
    ): string {
        return `${this.imageBaseUrl}?filename=${name}&width=${width}&height=${height}`;
    }
}
