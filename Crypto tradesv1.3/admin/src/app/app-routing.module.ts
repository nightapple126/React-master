import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { GuestGuard } from './guard/guest.guard';
import { UserGuard } from './guard/user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[GuestGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate:[UserGuard],
    children: [
      {
        path: 'users',
        loadChildren: () => import('./components/users/user.module').then(m => m.UserModule)
      },
      {
        path: 'collections',
        loadChildren: () => import('./components/collections/collection.module').then(m => m.CollectionModule)
      },
      {
        path: 'items',
        loadChildren: () => import('./components/items/item.module').then(m => m.ItemModule)
      },
      {
        path: 'activities',
        loadChildren: () => import('./components/activities/activity.module').then(m => m.ActivityModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./components/categories/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'offers',
        loadChildren: () => import('./components/offers/offer.module').then(m => m.OfferModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./components/settings/setting.module').then(m => m.SettingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
