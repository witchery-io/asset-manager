import { NgModule } from '@angular/core';

import { TradingRoutingModule } from './trading-routing.module';
import { TradingComponent } from '@trading/containers';
import { SharedModule } from '@app/shared/shared.module';
import { WebSocketService } from '@trading/services/ws/web-socket.service';
import { WsHandlerService } from '@trading/services/ws/ws-handler.service';
import { WSActionHandlerClient } from '@trading/services/ws/ws-action-handler-client.service';

@NgModule({
  declarations: [
    TradingComponent,
  ],
  imports: [
    SharedModule,
    TradingRoutingModule,
  ],
  providers: [
    WebSocketService,
    WsHandlerService,
    WSActionHandlerClient,
  ],
})
export class TradingModule { }
