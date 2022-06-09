/*
Project : Cryptotrades
FileName :  itemlist.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for list and search the item data.
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/app/constants/config';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  selectedItem: any;
  mediaBase: string = config.media_path;
  itemMediaBase: string = config.media_path + '/images/item/thumb/';
  collectionMediaBase: string = config.media_path + '/images/collection/logo/';
  loading: boolean = true
  isApiLoading: boolean = false
  page: number = 1
  keyword: any = "";
  type: any = "";
  items: any = []
  currentUser: any;
  totalDocs: any = 0;
  limit: any = 15;
  hasNextPage: boolean = false;
  searchInput: string = ""
  selectedFilter: string = "";

  /*
  * constructing the init functions and creating object for services
  */
  constructor(
    private itemService: ItemService
  ) {
    this.getItemList();
  }

  ngOnInit(): void {
  }
  /*
  * get all activity list data
  */
  getItemList = () => {
    this.isApiLoading = true;
    this.loading = true
    var params = {
      keyword: this.keyword ? this.keyword : null,
      page: this.page,
      user_id: ''
    }
    if (this.currentUser != null) {
      params.user_id = this.currentUser.user_id
    }
    this.itemService.list(params).subscribe(result => {
      this.isApiLoading = false;
      if (result.status == true) {
        this.items = result.tempArray
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
  * Apply event bid filters
  */
  applyFilter(filter: any) {
    this.getItemList()
  }
  /*
  * Load next page data
  */
  nextPage = () => {
    this.page = this.page + 1;
    this.getItemList();
  }

  /*
  * Load previous page data
  */
  prevPage = () => {
    this.page = this.page - 1;
    this.getItemList();
  }
  /*
  * search data
  */
  searchAction = () => {
    console.log(this.searchInput)
    this.keyword = this.searchInput;
    this.page = 1;
    this.getItemList();
  }
  /*
  * reset search inputs
  */
  resetAction = () => {
    this.searchInput = "";
    this.searchAction();
  }
}
