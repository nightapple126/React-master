import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferlistComponent } from './offerlist/offerlist.component';

const routes: Routes = [
  {
    path: '',
    component: OfferlistComponent,
    data: {
      title: 'Offers'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule {}
