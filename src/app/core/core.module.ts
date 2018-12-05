import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { TradingModule } from '@trading/trading.module';
import { BotsModule } from '@bots/bots.module';
import { SettingsModule } from '@settings/settings.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AccountService } from '@app/core/services';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument({
      maxAge: 30,
    }),

    TradingModule,
    BotsModule,
    SettingsModule,
  ],
  providers: [
    AccountService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
