import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradingRoutingModule } from './trading-routing.module';
import { MainComponent } from '@trading/containers';
import { AccountsComponent, BalanceComponent, GroupsComponent, TicksComponent, } from '@trading/components';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@trading/reducers';
import { EffectsModule } from '@ngrx/effects';
import { BalanceEffects } from '@trading/effects/balance.effects';
import { OrdersEffects } from '@trading/effects/orders.effects';
import { PositionsEffects } from '@trading/effects/positions.effects';
import { BalanceService, ModalService, OrdersService, PositionsService, SharedService } from '@app/shared/services';
import { TabsModule } from 'ngx-bootstrap';
import { TvChartComponent } from '@trading/components/tv-chart/tv-chart.component';
import { ButtonViewComponent } from '@trading/components/button-view/button-view.component';
import { FavoriteViewComponent } from '@trading/components/favorite-view/favorite-view.component';
import { WebSocketService, WsHandlerService, WSActionHandlerClient, WSActionHandlerServer } from '@trading/services';

@NgModule({
  declarations: [
    MainComponent,
    AccountsComponent,
    GroupsComponent,
    TicksComponent,
    BalanceComponent,
    TvChartComponent,
    ButtonViewComponent,
    FavoriteViewComponent,
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
    PositionsService,
    OrdersService,
    BalanceService,
    ModalService,
    SharedService,

    WebSocketService,
    WsHandlerService,
    WSActionHandlerClient,
    WSActionHandlerServer,
  ],
  entryComponents: [
    ButtonViewComponent,
    FavoriteViewComponent,
  ],
})
export class TradingModule {
}
