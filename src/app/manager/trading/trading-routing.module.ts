import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingComponent } from '@trading/containers';

const routes: Routes = [
  {
    path: '',
    component: TradingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingRoutingModule { }
