/*
Project : Cryptotrades
FileName :  category.module.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for importing all category related modules.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryRoutingModule } from './category-routing.module';
import { MomentModule } from 'ngx-moment';
import { LoaderModule } from 'src/app/UI/loader/loader.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { CategoryActionComponent } from './category-action/category-action.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CategoryRoutingModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
    LoaderModule,
    FileUploadModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [CategorylistComponent, ViewCategoryComponent, CategoryActionComponent]
})
export class CategoryModule { }
