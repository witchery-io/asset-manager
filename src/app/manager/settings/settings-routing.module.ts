import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@settings/containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accounts/6a86df61-c190-4347-9b61-34cbd88d38a4/edc23b04-64d8-4469-bb6a-40da55322d26/groups/orders',
  },
  {
    path: ':type/:id/:accId/:generalTab/:orderTab',
    component: MainComponent,
  },
  {
    path: ':type/:id/:generalTab/:orderTab',
    component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
