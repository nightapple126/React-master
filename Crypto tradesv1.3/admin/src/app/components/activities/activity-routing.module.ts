/*
Project : Cryptotrades
FileName :  activity-routing.module.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for handling activity routing modules.
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitylistComponent } from './activitylist/activitylist.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitylistComponent,
    data: {
      title: 'Activities'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule {}
