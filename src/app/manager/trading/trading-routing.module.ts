import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingComponent } from '@trading/containers';

const routes: Routes = [
  {
    path: 'trading',
    data: { title: 'Trading' },
    children: [
      {
        path: '',
        component: TradingComponent,
        pathMatch: 'full',
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingRoutingModule { }
