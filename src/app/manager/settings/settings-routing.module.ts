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
  /*
  *   edc23b04-64d8-4469-bb6a-40da55322d26
  *   6a86df61-c190-4347-9b61-34cbd88d38a4
  * */
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
