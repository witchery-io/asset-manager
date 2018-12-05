import { NgModule } from '@angular/core';

import { BotsRoutingModule } from '@bots/bots-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { BotsComponent } from '@bots/containers';

@NgModule({
  declarations: [
    BotsComponent,
  ],
  imports: [
    SharedModule,
    BotsRoutingModule,
  ]
})
export class BotsModule { }
