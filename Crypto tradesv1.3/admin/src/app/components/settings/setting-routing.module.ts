import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingactionComponent } from './settingaction/settingaction.component';

const routes: Routes = [
  {
    path: '',
    component: SettingactionComponent,
    data: {
      title: 'Settings'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
