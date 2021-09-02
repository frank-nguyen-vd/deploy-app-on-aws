import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../shared/photo.service';

@Component({
  selector: 'app-photo-collection',
  templateUrl: './photo-collection.component.html',
  styleUrls: ['./photo-collection.component.css'],
})
export class PhotoCollectionComponent implements OnInit {
  photos: string[] = [];
  photosPerRow: number = 1;
  photoWidth: number = 1000;
  photoHeight: number = 1000;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getPhotoNames().subscribe((res) => {
      this.photos = res;
    });
  }

  updateSetting(event: any) {
    this.photosPerRow = event.value;
    this.photoWidth = 100 * (10 - this.photosPerRow + 1);
    this.photoHeight = 100 * (10 - this.photosPerRow + 1);
  }
}
