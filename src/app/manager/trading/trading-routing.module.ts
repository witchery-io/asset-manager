import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingComponent } from '@trading/containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'groups/6a86df61-c190-4347-9b61-34cbd88d38a4/orders',
  },
  {
    path: ':type/:id/:tab',
    component: TradingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingRoutingModule { }
