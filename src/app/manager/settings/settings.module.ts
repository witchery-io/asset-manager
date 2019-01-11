import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from '@settings/settings-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MainComponent } from '@settings/containers';
import {
  AccountsTabComponent,
  GroupsTabComponent,
  AccountsTabAccountComponent,
  GroupsTabAccountComponent,
  GroupsTabGroupComponent,
  BalanceDetailsComponent,
} from '@settings/components';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@settings/reducers';
import { EffectsModule } from '@ngrx/effects';
import { BalanceEffects } from '@settings/effects/balance.effects';
import { OrdersEffects } from '@settings/effects/orders.effects';
import { PositionsEffects } from '@settings/effects/positions.effects';
import { BalanceService, ModalService, OrdersService, PositionsService, SharedService } from '@app/shared/services';
import { TabsModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    MainComponent,
    AccountsTabComponent,
    GroupsTabComponent,
    AccountsTabAccountComponent,
    BalanceDetailsComponent,
    GroupsTabAccountComponent,
    GroupsTabGroupComponent,
    BalanceDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule,
    StoreModule.forFeature('settings', reducers),
    EffectsModule.forFeature([BalanceEffects, OrdersEffects, PositionsEffects]),
    TabsModule.forRoot(),
  ],
  providers: [
    PositionsService,
    OrdersService,
    BalanceService,
    ModalService,
    SharedService,
  ],
})
export class SettingsModule { }
