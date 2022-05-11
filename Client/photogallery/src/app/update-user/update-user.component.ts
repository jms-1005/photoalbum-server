import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  email:string = '';
  password:string = '';

  constructor(private cs:CommonService) { }

  updateUser(){

  }

  ngOnInit(): void {
    console.log(localStorage.getItem("photoUserID"));
    let userID = localStorage.getItem("photoUserID");
    this.cs.getUser(userID).subscribe( userDetails => {
      console.log(userDetails);
      this.email = userDetails.userData[0].email;
      this.password = userDetails.userData[0].password;
    })
  }

}
