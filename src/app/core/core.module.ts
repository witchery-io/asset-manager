import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AccountService, GroupService, TickService, WebSocketService } from '@app/core/services';
import { reducers } from '@app/core/reducers';
import { AccountEffects } from '@app/core/effects/account.effects';
import { GroupEffects } from '@app/core/effects/group.effects';
import { TickEffects } from '@app/core/effects/tick.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forRoot({}),
    StoreModule.forFeature('core', reducers),
    EffectsModule.forRoot([AccountEffects, GroupEffects, TickEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 60,
    }),
  ],
  providers: [
    AccountService,
    GroupService,
    TickService,
    WebSocketService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
