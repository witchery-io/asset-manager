import { NgModule } from '@angular/core';

import { BotsRoutingModule } from '@bots/bots-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MainComponent } from '@bots/containers';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BotsRoutingModule,
  ]
})
export class BotsModule { }
