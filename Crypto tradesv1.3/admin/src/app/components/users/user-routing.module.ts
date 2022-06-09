import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { UseractionComponent } from './useraction/useraction.component';
import { UserviewComponent } from './userview/userview.component';

const routes: Routes = [
  {
    path: '',
    component: UserlistComponent,
    data: {
      title: 'Users List'
    }
  },
  {
    path: 'add',
    component: UseractionComponent,
    data: {
      title: 'Add Users'
    }
  },
  {
    path: 'edit/:id',
    component: UseractionComponent,
    data: {
      title: 'Edit Users'
    }
  },
  {
    path: 'view/:id',
    component: UserviewComponent,
    data: {
      title: 'View User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
