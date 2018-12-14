import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from '@settings/settings-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { SettingsComponent } from '@settings/containers';
import { AccountsComponent, GroupsComponent } from '@settings/components';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@settings/reducers';
import { EffectsModule } from '@ngrx/effects';
import { BalanceEffects } from '@settings/effects/balance.effects';
import { OrdersEffects } from '@settings/effects/orders.effects';
import { PositionsEffects } from '@settings/effects/positions.effects';

@NgModule({
  declarations: [
    SettingsComponent,
    AccountsComponent,
    GroupsComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    StoreModule.forFeature('settings', reducers),
    EffectsModule.forRoot([BalanceEffects, OrdersEffects, PositionsEffects]), // todo :: forFeature
  ]
})
export class SettingsModule { }
