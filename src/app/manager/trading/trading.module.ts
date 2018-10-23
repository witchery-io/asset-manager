import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TradingComponent } from './containers/trading/trading.component';

export const ROUTES: Routes = [{ path: '', component: TradingComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    TradingComponent,
  ]
})
export class TradingModule { }
