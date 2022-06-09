import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionlistComponent } from './collectionlist/collectionlist.component';
import {ViewCollectionComponent} from './view-collection/view-collection.component'
const routes: Routes = [
  {
    path: '',
    component: CollectionlistComponent,
    data: {
      title: 'Collections'
    }
  },
  {
    path: 'view/:id',
    component: ViewCollectionComponent,
    data: {
      title: 'View Collections'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule {}
