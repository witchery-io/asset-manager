import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { BotsComponent } from './containers/bots/bots.component';

export const ROUTES: Routes = [{ path: '', component: BotsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot(),
  ],
  declarations: [
    BotsComponent,
  ]
})
export class BotsModule { }
