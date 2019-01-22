import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@settings/containers';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: ':generalTab',
    component: MainComponent,
  },
  {
    path: ':generalTab/:id',
    component: MainComponent,
  },
  {
    path: ':generalTab/:id/:orderTab',
    component: MainComponent,
  },
  {
    path: ':generalTab/:id/:subType/:subId',
    component: MainComponent,
  },
  {
    path: ':generalTab/:id/:subType/:subId/:orderTab',
    component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
