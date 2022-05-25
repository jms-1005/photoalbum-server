import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo, PhotoTB } from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoserviceService {
  private url = "http://localhost:4400/photosapi";

  constructor(private http:HttpClient) { }

  getAllPhotos(){
    return this.http.get<PhotoTB[]>(this.url);
  }

  getPhotoById(id:number){
    return this.http.get<Photo>(this.url + "/" + id);
  }

  addNewPhoto(){

  }

}
