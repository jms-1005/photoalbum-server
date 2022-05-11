import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private loginURL = "http://localhost:4400/login";
  private signupURL = "http://localhost:4400/signup";
  private userURL = "http://localhost:4400/user";
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

}
