import { NgModule } from '@angular/core';

import { TradingRoutingModule } from './trading-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TradingComponent } from './containers';

import { StoreModule } from '@ngrx/store';
import * as reducers from '../../core/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from '../../core/effects';

@NgModule({
  declarations: [
    TradingComponent,
  ],
  imports: [
    SharedModule,

    StoreModule.forFeature('accounts', reducers.reducer),
    EffectsModule.forFeature([ AccountEffects ]),

    TradingRoutingModule,
  ]
})
export class TradingModule { }
