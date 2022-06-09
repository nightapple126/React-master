/*
Project : Cryptotrades
FileName :  category-routing.module.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for handling category routings.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { CategoryActionComponent } from './category-action/category-action.component';

const routes: Routes = [
  {
    path: '',
    component: CategorylistComponent,
    data: {
      title: 'Categories'
    }
  },
  {
    path: 'add',
    component: CategoryActionComponent,
    data: {
      title: 'Add Category'
    }
  },
  {
    path: 'edit/:id',
    component: CategoryActionComponent,
    data: {
      title: 'Edit Category'
    }
  },
  {
    path: 'view/:id',
    component: ViewCategoryComponent,
    data: {
      title: 'View Category'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
