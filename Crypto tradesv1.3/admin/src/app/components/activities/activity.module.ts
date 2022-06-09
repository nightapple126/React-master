/*
Project : Cryptotrades
FileName :  activity.module.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for import all activity related modules.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityRoutingModule } from './activity-routing.module';
import { MomentModule } from 'ngx-moment';
import { LoaderModule } from 'src/app/UI/loader/loader.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ActivitylistComponent } from './activitylist/activitylist.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ActivityRoutingModule,
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
  declarations: [ActivitylistComponent]
})
export class ActivityModule { }
