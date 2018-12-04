import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { TradingModule } from '../manager/trading/trading.module';
import { BotsModule } from '../manager/bots/bots.module';
import { SettingsModule } from '../manager/settings/settings.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,

    TradingModule,
    BotsModule,
    SettingsModule,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
