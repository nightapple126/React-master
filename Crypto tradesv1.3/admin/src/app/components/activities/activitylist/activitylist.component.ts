/*
Project : Cryptotrades
FileName :  activitylist.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for list and filter the activity data.
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/app/constants/config';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activitylist',
  templateUrl: './activitylist.component.html',
  styleUrls: ['./activitylist.component.css']
})
export class ActivitylistComponent implements OnInit {
  selectedItem: any;
  mediaBase:string = config.media_path;
  itemMediaBase: string = config.media_path +'/images/item/thumb/';
  collectionMediaBase: string = config.media_path +'/images/collection/logo/';
  loading: boolean = true
  isApiLoading: boolean = false
  page: number = 1
  keyword: any = "";
  type: any = "";
  activities: any = []
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
    private activityService: ActivityService
  ) {
    this.getActivityList();
  }

  ngOnInit(): void {
  }
  /*
  * get all activity list data
  */
  getActivityList = () => {
    this.isApiLoading = true;
    this.loading = true
    var params = {
      filter: this.selectedFilter ? this.selectedFilter : null,
      page: this.page,
      user_id: ''
    }
    if (this.currentUser != null) {
      params.user_id = this.currentUser.user_id
    }
    this.activityService.list(params).subscribe(result => {
      this.isApiLoading = false;
      if (result.status == true) {
        this.activities = result.tempArray
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
  * Apply event filters
  */
  applyFilter() {
    this.getActivityList()
  }
  /*
  * Load next page data
  */
  nextPage = () => {
    this.page = this.page + 1;
    this.getActivityList();
  }

  /*
  * Load previous page data
  */
  prevPage = () => {
    this.page = this.page - 1;
    this.getActivityList();
  }  

}
