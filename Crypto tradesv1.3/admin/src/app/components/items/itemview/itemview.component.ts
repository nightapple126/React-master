/*
Project : Cryptotrades
FileName :  itemview.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used to show the detail view of list
*/
import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/constants/config';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.component.html',
  styleUrls: ['./itemview.component.css']
})
export class ItemviewComponent implements OnInit {
  mediaBase:string = config.media_path
  currentItemID:any;
  itemInfo: any = null;
  subscription:any;
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.currentItemID = params.id;
      this.getItemInfo()
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  /*
  * This is the function which used to get item info
  */
  getItemInfo() {
    this.itemService.viewItem({item_id: this.currentItemID}).subscribe(result=>{
      this.itemInfo = result.data.docs[0];
    })
  }
}
