/*
Project : Cryptotrades
FileName :  userlist.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used to list users
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/app/constants/config';
import { UserService } from 'src/app/services/user.service';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  subscription:any;
  selectedItem:any;
  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
  mediaBase:string = config.media_path;
  loading:boolean = true
  isApiLoading: boolean = false
  page:number = 1
  keyword:any = "";
  type:any = "";
  users: any = []
  currentUser:any;
  totalDocs:any = 0;
  limit:any = 15;
  hasNextPage:boolean = false;
  searchInput:string = ""
  constructor(
    private userService: UserService
  ) { 
    this.confirmationModal = this.subscription;
    this.currentUser = this.userService.getUser();
    this.getUserList();
  }

  ngOnInit(): void {
  }

  /*
  * This is the function which used to get the user list
  */
  getUserList = () => {
    this.isApiLoading = true;
    this.loading = true
    var params = {
      keyword: this.keyword,
      page: this.page,
      user_id:''
    }
    if(this.currentUser != null) {
      params.user_id = this.currentUser.user_id
    }
    this.userService.list(params).subscribe(result=>{
      this.isApiLoading = false;
      if(result.status == true) {
         this.users = result.tempArray
         if(result.data.totalDocs > (result.data.offset + result.tempArray.length)) {
          this.hasNextPage = true;
         } else {
          this.hasNextPage = false;
         }
      } else {
        this.hasNextPage = false;
      }
      this.loading = false;
    })
  }

  /*
  * This is the function which used in pagination to trigger the next page API call
  */
  nextPage = () => {
    this.page = this.page + 1;
    this.getUserList();
  }

  /*
  * This is the function which used in pagination to trigger the previous page API call
  */
  prevPage = () => {
    this.page = this.page - 1;
    this.getUserList();
  }

  /*
  * This is the function which used to search users
  */
  searchAction = () => {
    this.keyword = this.searchInput;
    this.page = 1;
    this.getUserList();
  }

  /*
  * This is the function which used to reset the search form
  */
  resetAction = () => {
    this.searchInput = "";
    this.searchAction();
  }

  /*
  * This is the function which used to block user
  */
  blockUserAction = (is_block:boolean) => {
       for (let index = 0; index < this.users.length; index++) {
         const element = this.users[index];
         if(element._id == this.selectedItem._id) {
          this.users[index].status = is_block ? "blocked" : "active";
          break;
         }
       }
       this.confirmationModal.hide();
       this.userService.updateUsers({
         status:  is_block ? "blocked" : "active",
         user_id:this.selectedItem._id
       }).subscribe(result=>{

       });
  }

}
