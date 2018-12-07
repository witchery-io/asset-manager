import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AccountService, GroupService } from '@app/core/services';
import { reducers } from '@app/core/reducers';
import { AccountEffects } from '@app/core/effects/account.effects';
import { GroupEffects } from '@app/core/effects/group.effects';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,

    StoreModule.forRoot({}),
    StoreModule.forFeature('app', reducers),
    EffectsModule.forRoot([AccountEffects, GroupEffects]), // set effects

    StoreDevtoolsModule.instrument({
      maxAge: 30,
    }),
  ],
  providers: [
    AccountService,
    GroupService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
