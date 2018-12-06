import { NgModule } from '@angular/core';

import { TradingRoutingModule } from './trading-routing.module';
import { TradingComponent } from '@trading/containers';
import { SharedModule } from '@app/shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from '@app/core/effects/account.effects';
import { GroupEffects } from '@app/core/effects/group.effects';
import { reducers } from '@app/core/reducers';

@NgModule({
  declarations: [
    TradingComponent,
  ],
  imports: [
    SharedModule,

    StoreModule.forFeature('trading', reducers),
    EffectsModule.forFeature([AccountEffects, GroupEffects]),

    TradingRoutingModule,
  ]
})
export class TradingModule { }
