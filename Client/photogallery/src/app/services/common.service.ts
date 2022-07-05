import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
interface Login{
  login: boolean;
  message: string;
  data: [
    {
      UserID:number;
      email:string;
      password:string;
    }
  ]
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private server = environment.server;
  private loginURL = this.server + "login";
  private signupURL = this.server + "signup";
  private userURL = this.server + "user";
  private updateURL = this.server + "updateUser";
  private deleteURL = this.server + "deleteuser";

  constructor(private http:HttpClient) { }

  loginService(email:string, password:string){
    let loginBody = {
      email: email,
      password: password
    }
    return this.http.post<Login>(this.loginURL, loginBody);
  }

  signupService(email:string, password:string){
    let signupbody ={
      "email": email,
      "password": password
  }
    return this.http.post<{ newuser:boolean, message:any }>(this.signupURL, signupbody);
  }

  getUser(id:any){
    return this.http.get<{ user: boolean, message:string, userData: [ { UserID:number, email:string, password:string }]}>(this.userURL + "/" + id);
  }

  updateUser(id:any, email:string, password:string){
    let updateBody = {
      "UserID": id,
      "email": email,
      "password": password
  }
    return this.http.put<{ update:boolean, message:any  }>(this.updateURL, updateBody);
  }

  deleteUser(id:any){
    return this.http.delete<{ deleteUser:boolean, message:any }>(this.deleteURL + "/" + id);
  }

}
