import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingComponent } from '@trading/containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accounts/edc23b04-64d8-4469-bb6a-40da55322d26/orders',
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
