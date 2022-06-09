/*
Project : Cryptotrades
FileName :  collectionlist.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for list and search the collection data.
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/app/constants/config';
import { CollectionService } from 'src/app/services/collection.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-collectionlist',
  templateUrl: './collectionlist.component.html',
  styleUrls: ['./collectionlist.component.css']
})
export class CollectionlistComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
  subscription: any;
  selectedItem: any;
  mediaBase: string = config.media_path;
  loading: boolean = true
  isApiLoading: boolean = false
  page: number = 1
  keyword: any = "";
  type: any = "";
  collections: any = []
  currentUser: any;
  totalDocs: any = 0;
  limit: any = 15;
  hasNextPage: boolean = false;
  searchInput: string = ""
  /*
  * constructing the init functions and creating object for services
  */
  constructor(
    private collectionService: CollectionService,
    private snackBar: MatSnackBar
  ) {
    this.confirmationModal = this.subscription;
    this.currentUser = this.collectionService.getUser();
    this.getCollectionList();
  }
  ngOnInit(): void {
  }

  /*
  * get all collection list data
  */

  getCollectionList = () => {
    this.isApiLoading = true;
    this.loading = true
    var params = {
      keyword: this.keyword,
      page: this.page,
      user_id: ''
    }
    if (this.currentUser != null) {
      params.user_id = this.currentUser.user_id
    }
    this.collectionService.list(params).subscribe(result => {
      this.isApiLoading = false;
      if (result.status == true) {
        this.collections = result.tempArray
        if (result.data.totalDocs > (result.data.offset + result.tempArray.length)) {
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
  * Load next page data
  */

  nextPage = () => {
    this.page = this.page + 1;
    this.getCollectionList();
  }

  /*
  * Load previous page data
  */

  prevPage = () => {
    this.page = this.page - 1;
    this.getCollectionList();
  }

  /*
  * search data
  */
  searchAction = () => {
    this.keyword = this.searchInput;
    this.page = 1;
    this.getCollectionList();
  }

  /*
  * reset data with filter
  */

  resetAction = () => {
    this.searchInput = "";
    this.searchAction();
  }
 

}
