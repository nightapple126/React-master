/*
Project : Cryptotrades
FileName :  view-category.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for view particular category.
*/
import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/constants/config';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  mediaBase:string = config.media_path
  currentUserID:any;
  categoryInfo: any;
  subscription:any;
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }  

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      
      if(params.id) {
        this.currentUserID = params.id;
        this.getCategoryInfo()
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
  * This is the function which used for get particular category
  */
  getCategoryInfo = () => {
    this.categoryService.viewCategory(this.currentUserID).subscribe(result=>{
      var resulter:any = result;
      this.categoryInfo = resulter.result;
      console.log(this.categoryInfo)
    })
  }

}
