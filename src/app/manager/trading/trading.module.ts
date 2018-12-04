import { NgModule } from '@angular/core';

import { TradingRoutingModule } from './trading-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TradingComponent } from './containers';

@NgModule({
  declarations: [
    TradingComponent,
  ],
  imports: [
    SharedModule,
    TradingRoutingModule,
  ]
})
export class TradingModule { }
