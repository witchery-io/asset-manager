import { NgModule } from '@angular/core';

import { BotsRoutingModule } from './bots-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BotsComponent } from './containers';

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
