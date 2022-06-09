import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { MomentModule } from 'ngx-moment';
import { UserlistComponent } from './userlist/userlist.component';
import { LoaderModule } from 'src/app/UI/loader/loader.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { UseractionComponent } from './useraction/useraction.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserviewComponent } from './userview/userview.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule,
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
  declarations: [UserlistComponent, UseractionComponent, UserviewComponent]
})
export class UserModule { }
