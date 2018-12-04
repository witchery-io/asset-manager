import { NgModule } from '@angular/core';

import { TradingRoutingModule } from './trading-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TradingComponent } from './containers';
import { AccountsComponent, GroupsComponent } from './components';

@NgModule({
  declarations: [
    TradingComponent,
    AccountsComponent,
    GroupsComponent,
  ],
  imports: [
    SharedModule,
    TradingRoutingModule,
  ]
})
export class TradingModule { }
