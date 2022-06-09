/*
Project : Cryptotrades
FileName :  itemview.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used to show the detail view of user
*/
import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/constants/config';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {
  mediaBase:string = config.media_path
  currentUserID:any;
  userInfo: any;
  subscription:any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      
      if(params.id) {
        this.currentUserID = params.id;
        this.getProfileInfo()
      } else {
        this.currentUserID = ""
      }
      console.log(params) //log the entire params object
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  /*
  * This is the function which used to get user info
  */
  getProfileInfo = () => {
    this.userService.viewProfile(this.currentUserID).subscribe(result=>{
      var resulter:any = result;
      this.userInfo = resulter.result;
      this.userInfo.is_follow = resulter.is_follow;
      this.userInfo.is_block = resulter.is_block;
    })
  }
}
