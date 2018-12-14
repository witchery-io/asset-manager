import { NgModule } from '@angular/core';

import { TradingRoutingModule } from './trading-routing.module';
import { TradingComponent } from '@trading/containers';
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

@NgModule({
  declarations: [
    TradingComponent,
  ],
  imports: [
    SharedModule,
    TradingRoutingModule,
    StoreModule.forFeature('trading', reducers),
    EffectsModule.forRoot([BalanceEffects, OrdersEffects, PositionsEffects]), // todo :: forFeature
  ],
  providers: [
    WebSocketService,
    WsHandlerService,
    WSActionHandlerClient,
  ],
})
export class TradingModule { }
