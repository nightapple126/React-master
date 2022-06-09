/*
Project : Cryptotrades
FileName :  item-routing.module.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for handling all item routings.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { ItemviewComponent } from './itemview/itemview.component';

const routes: Routes = [
  {
    path: '',
    component: ItemlistComponent,
    data: {
      title: 'Items'
    }
  },
  {
    path: 'view/:id',
    component: ItemviewComponent,
    data: {
      title: 'View Item'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {}
