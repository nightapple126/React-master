/*
Project : Cryptotrades
FileName :  offerlist.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used to list the offers in admin panel
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/app/constants/config';
import { UserService } from 'src/app/services/user.service';
import { OfferService } from 'src/app/services/offer.service';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-offerlist',
  templateUrl: './offerlist.component.html',
  styleUrls: ['./offerlist.component.css']
})
export class OfferlistComponent implements OnInit {

  subscription:any;
  selectedItem:any;
  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
  mediaBase:string = config.media_path;
  loading:boolean = true
  isApiLoading: boolean = false
  page:number = 1
  type:any = "";
  offers: any = []
  currentUser:any;
  totalDocs:any = 0;
  limit:any = 15;
  hasNextPage:boolean = false;
  searchInput:string = ""
  constructor(
    private userService: UserService,
    private offerService: OfferService
  ) { 
    this.confirmationModal = this.subscription;
    this.currentUser = this.userService.getUser();
    this.getOfferList();
  }

  ngOnInit(): void {
  }

  /*
  * This is the function which used to get the offer list
  */
  getOfferList = () => {
    this.isApiLoading = true;
    this.loading = true
    var params = {
      page: this.page,
      user_id:'',
      user: 'admin'
    }
    if(this.currentUser != null) {
      params.user_id = this.currentUser.user_id
    }
    this.offerService.list(params).subscribe(result=>{
      this.isApiLoading = false;
      if(result.status == true) {
         this.offers = result.data.docs
         if(result.data.totalDocs > (result.data.offset + result.data.docs.length)) {
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
    this.getOfferList();
  }

  /*
  * This is the function which used in pagination to trigger the previous page API call
  */
  prevPage = () => {
    this.page = this.page - 1;
    this.getOfferList();
  }

}
