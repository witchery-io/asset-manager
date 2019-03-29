import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from '@settings/settings-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MainComponent } from '@settings/containers';
import {
  AccountsTabComponent,
  AddAccountFormComponent,
  BalanceDetailsComponent,
  GroupFormComponent,
  GroupsTabComponent,
} from '@settings/components';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@settings/reducers';
import { EffectsModule } from '@ngrx/effects';
import { BalanceEffects } from '@settings/effects/balance.effects';
import { OrdersEffects } from '@settings/effects/orders.effects';
import { PositionsEffects } from '@settings/effects/positions.effects';
import { BalanceService, ModalService, OrdersService, PositionsService, SharedService, } from '@app/shared/services';
import { BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { AccountFormComponent } from './components/templates/account-form/account-form.component';
import { GroupEffects } from '@settings/effects/group.effects';
import { AccountEffects } from '@settings/effects/account.effects';
import { WebSocketService, WsHandlerService, WSActionHandlerClient, WSActionHandlerServer  } from '@settings/services';

@NgModule({
  declarations: [
    MainComponent,
    AccountsTabComponent,
    GroupsTabComponent,
    BalanceDetailsComponent,
    BalanceDetailsComponent,
    AddAccountFormComponent,
    GroupFormComponent,
    AccountFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule,
    StoreModule.forFeature('settings', reducers),
    EffectsModule.forFeature([
      BalanceEffects,
      OrdersEffects,
      PositionsEffects,
      GroupEffects,
      AccountEffects,
    ]),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
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
})
export class SettingsModule {
}
