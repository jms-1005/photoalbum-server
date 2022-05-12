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
  updateStatus = true;

  constructor(private cs:CommonService) { }

  updateUser(){
    let id = localStorage.getItem("photoUserID");
    this.cs.updateUser(id, this.email, this.password).subscribe( updateConfirmation => {
      console.log(updateConfirmation.update);
      this.updateStatus = updateConfirmation.update;
    })
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
