/*
Project : Cryptotrades
FileName :  categorylist.component.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for list,add,edit and view categories
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/app/constants/config';
import { CategoryService } from 'src/app/services/category.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {
  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
  subscription: any;
  selectedItem: any;
  mediaBase: string = config.media_path;
  loading: boolean = true
  isApiLoading: boolean = false
  page: number = 1
  keyword: any = "";
  type: any = "";
  categories: any = []
  currentUser: any;
  totalDocs: any = 0;
  limit: any = 15;
  hasNextPage: boolean = false;
  searchInput: string = ""
  /*
  * constructing the init functions and creating object for services
  */
  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this.confirmationModal = this.subscription;
    this.currentUser = this.categoryService.getUser();
    this.getCategoryList();
  }
  ngOnInit(): void {
  }
  /*
  * This is the function which used to get all category lists
  */
  getCategoryList = () => {
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
    this.categoryService.list(params).subscribe(result => {
      this.isApiLoading = false;
      if (result.status == true) {
        this.categories = result.tempArray
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
  * This is the function which used to get next page categories
  */
  nextPage = () => {
    this.page = this.page + 1;
    this.getCategoryList();
  }
  /*
  * This is the function which used to get previous page categories
  */
  prevPage = () => {
    this.page = this.page - 1;
    this.getCategoryList();
  }
  /*
  * This is the function which used to delete category
  */
  deleteCategory(id: any) {
    console.log(id,this.selectedItem)
    var f = {
      category_id: id
    };
    this.categoryService.deleteCategory(f).subscribe(result => {
      this.confirmationModal.hide();
      this.snackBar.open(result.message, "", { duration: 2000 });
      this.getCategoryList();
    });
  }

}
