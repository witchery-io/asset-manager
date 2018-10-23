import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BotsComponent } from './containers/bots/bots.component';

export const ROUTES: Routes = [{ path: '', component: BotsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    BotsComponent,
  ]
})
export class BotsModule { }
