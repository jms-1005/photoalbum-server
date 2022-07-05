import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo, PhotoTB } from '../interfaces/photo.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoserviceService {
  private server = environment.server;
  private url = this.server + "photosapi";
  private photoURL = this.server + "photos";
  private fileuploadURL = this.server + "upload";

  constructor(private http:HttpClient) { }

  getAllPhotos(){
    return this.http.get<{allphotos: [ Photo[] ], message: any }>(this.photoURL);
  }

  getPhotoById(id:number){
    return this.http.get<{ photo: Photo, message:any }>(this.photoURL + "/" + id);
  }

  uploadFile(formdata:any){
    return this.http.post(this.fileuploadURL, formdata);
  }

  addNewPhoto(albumId:number, title:string, filename:string){
    let newphotobody = {
      "albumId_fromC": albumId,
      "title_fromC": title,
      "url_fromC": filename,
      "tn_fromC": "tn_Spotify_Logo_RGB_Green.png"
    }
    return this.http.post<{ newphoto: [Photo], message: any }>(this.photoURL, newphotobody);
  }

  deletePhoto(id:number){
    return this.http.delete<{ delStatus:any, message: any }>(this.photoURL + "/" + id);
  }

}
