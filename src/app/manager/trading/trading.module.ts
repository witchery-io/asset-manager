import { NgModule } from '@angular/core';

import { TradingRoutingModule } from './trading-routing.module';
import { TradingComponent } from '@trading/containers';
import { SharedModule } from '@app/shared/shared.module';

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
