import { Component, OnInit } from '@angular/core';
import { PhotoTB } from '../interfaces/photo.interface';
import { PhotoserviceService } from '../services/photoservice.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos:PhotoTB[] = [];

  constructor(private ps:PhotoserviceService) { }

  ngOnInit(): void {
    //this.photos = this.jsonData;
    this.ps.getAllPhotos().subscribe( photos => {
      this.photos = photos;
    });
  }

}
