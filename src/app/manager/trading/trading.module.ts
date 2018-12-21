import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradingRoutingModule } from './trading-routing.module';
import { TradingComponent } from '@trading/containers';
import {
  AccountsComponent,
  GroupsComponent,
  TicksComponent,
  BalanceComponent,
} from '@trading/components';
import { SharedModule } from '@app/shared/shared.module';
import { WebSocketService } from '@trading/services/ws/web-socket.service';
import { WsHandlerService } from '@trading/services/ws/ws-handler.service';
import { WSActionHandlerClient } from '@trading/services/ws/ws-action-handler-client.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@trading/reducers';
import { EffectsModule } from '@ngrx/effects';
import { BalanceEffects } from '@trading/effects/balance.effects';
import { OrdersEffects } from '@trading/effects/orders.effects';
import { PositionsEffects } from '@trading/effects/positions.effects';
import { BalanceService, ModalService, OrdersService, PositionsService, SharedService } from '@app/shared/services';
import { TabsModule } from 'ngx-bootstrap';
import { TvChartComponent } from '@trading/components/tv-chart/tv-chart.component';

@NgModule({
  declarations: [
    TradingComponent,
    AccountsComponent,
    GroupsComponent,
    TicksComponent,
    BalanceComponent,
    TvChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TradingRoutingModule,
    StoreModule.forFeature('trading', reducers),
    EffectsModule.forFeature([BalanceEffects, OrdersEffects, PositionsEffects]),
    TabsModule.forRoot(),
  ],
  providers: [
    WebSocketService,
    WsHandlerService,
    WSActionHandlerClient,

    PositionsService,
    OrdersService,
    BalanceService,
    ModalService,
    SharedService,
  ],
})
export class TradingModule { }
