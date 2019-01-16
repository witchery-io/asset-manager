import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@settings/containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accounts/edc23b04-64d8-4469-bb6a-40da55322d26/orders', // edc23b04-64d8-4469-bb6a-40da55322d26
  },
  {
    path: ':type/:id/:accountId/:tab',
    component: MainComponent,
  },
  {
    path: ':type/:id/:tab',
    component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
