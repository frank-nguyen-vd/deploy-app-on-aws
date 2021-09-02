import { Component, Input, OnInit } from '@angular/core';
import { PhotoService } from '../shared/photo.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})
export class PhotoComponent implements OnInit {
  @Input() photo: string;
  @Input() width: number;
  @Input() height: number;
  thumbnail: string = '';

  constructor(private photoService: PhotoService) {
    this.photo = '';
    this.width = 300;
    this.height = 300;
  }

  ngOnInit(): void {
    this.thumbnail = this.photoService.getPhoto(this.photo);
  }
}
