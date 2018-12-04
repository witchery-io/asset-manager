import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './containers';

const routes: Routes = [
  {
    path: 'settings',
    data: { title: 'Settings' },
    children: [
      {
        path: '',
        component: SettingsComponent,
        pathMatch: 'full',
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
