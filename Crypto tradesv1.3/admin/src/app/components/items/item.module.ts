/*
Project : Cryptotrades
FileName :  item.module.ts
Author : LinkWell
File Created : 21/07/2021
CopyRights : LinkWell
Purpose : This is the file which used for importing item related components.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemRoutingModule } from './item-routing.module';
import { MomentModule } from 'ngx-moment';
import { LoaderModule } from 'src/app/UI/loader/loader.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ItemlistComponent } from './itemlist/itemlist.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ItemRoutingModule,
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
  declarations: [ItemlistComponent]
})
export class ItemModule { }
