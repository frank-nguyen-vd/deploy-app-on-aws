import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Photo } from '../models/photo';
import { PhotoService } from '../shared/photo.service';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnChanges {
    @Input() photo: Photo;
    @Input() width: number;
    @Input() height: number;
    thumbnail: string = '';

    constructor(private photoService: PhotoService) {
        this.photo = {
            id: 0,
            name: ''
        };
        this.width = 0;
        this.height = 0;
    }

    ngOnChanges(): void {
        this.thumbnail = this.photoService.getPhotoWithSize(
            this.photo.name,
            this.width,
            this.height
        );
    }
}
