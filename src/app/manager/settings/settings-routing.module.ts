import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from '@settings/containers';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'groups/6a86df61-c190-4347-9b61-34cbd88d38a4/edc23b04-64d8-4469-bb6a-40da55322d26/orders',
    redirectTo: 'groups/6a86df61-c190-4347-9b61-34cbd88d38a4/orders',
  },
  {
    path: ':type/:groupId/:accountId/:tab',
    component: SettingsComponent,
  },
  {
    path: ':type/:id/:tab',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
