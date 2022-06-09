import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionRoutingModule } from './collection-routing.module';
import { MomentModule } from 'ngx-moment';
import { LoaderModule } from 'src/app/UI/loader/loader.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollectionlistComponent } from './collectionlist/collectionlist.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CollectionRoutingModule,
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
  declarations: [CollectionlistComponent,ViewCollectionComponent]
})
export class CollectionModule { }
