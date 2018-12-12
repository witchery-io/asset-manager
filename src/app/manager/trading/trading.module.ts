import { NgModule } from '@angular/core';

import { TradingRoutingModule } from './trading-routing.module';
import { TradingComponent } from '@trading/containers';
import { SharedModule } from '@app/shared/shared.module';
import { WebSocketService } from '@trading/services/ws/web-socket.service';

@NgModule({
  declarations: [
    TradingComponent,
  ],
  imports: [
    SharedModule,
    TradingRoutingModule,
  ],
  providers: [
    WebSocketService
  ],
})
export class TradingModule { }
