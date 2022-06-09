/*
Project : Cryptotrades
FileName :  collectionlist.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for view collection data.
*/

import { Component, OnInit } from '@angular/core';

import { config } from 'src/app/constants/config';
import { CollectionService } from 'src/app/services/collection.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.css']
})
export class ViewCollectionComponent implements OnInit {
  mediaBase:string = config.media_path
  collectionId:any;
  collectionInfo: any;
  collection:any;
  /*
  * constructing the init functions and creating object for services
  */
  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService
  ) { }  

  ngOnInit(): void {
    this.collection = this.route.params.subscribe(params => {
      
      if(params.id) {
        this.collectionId = params.id;
        this.getCollectionInfo()
      } else {
        this.collectionId = ""
      }
      console.log(params) //log the entire params object
    });
  }
  ngOnDestroy() {
  }

  /*
  * get all collection information based on collection id
  */

  getCollectionInfo = () => {
    this.collectionService.viewCollection(this.collectionId).subscribe(result=>{
      var resulter:any = result;
      this.collectionInfo = resulter.result;
    })
  }

}
