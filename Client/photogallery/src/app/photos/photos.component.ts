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
  fileupload:any;
  albumId:number = 0;
  title:string = '';
  filename:string = '';

  constructor(private ps:PhotoserviceService) { }

  trackFile(event:any){

    let myfile = event.target.files[0];
    this.filename = myfile.name
    console.log("MY FILE -->", myfile);
    const formdata = new FormData();
    formdata.append("file_fromC", myfile, myfile.name);
    this.fileupload = formdata;
  }

  addNewPhoto(){
    //console.log(this.albumId, this.title, this.filename);
    this.ps.addNewPhoto(this.albumId, this.title, this.filename).subscribe( newphoto =>{
      console.log(newphoto);
    })
  }

  ngOnInit(): void {
    //this.photos = this.jsonData;
    this.ps.getAllPhotos().subscribe( photos => {
      this.photos = photos;
    });
  }

}
