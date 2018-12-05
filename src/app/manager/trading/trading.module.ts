import { NgModule } from '@angular/core';

import { TradingRoutingModule } from './trading-routing.module';
import { TradingComponent } from '@trading/containers';
import { SharedModule } from '@app/shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from '@app/core/effects';

import { reducer } from '@app/core/reducers';

@NgModule({
  declarations: [
    TradingComponent,
  ],
  imports: [
    SharedModule,

    StoreModule.forFeature('accounts', reducer),
    EffectsModule.forFeature([AccountEffects]),

    TradingRoutingModule,
  ]
})
export class TradingModule { }
