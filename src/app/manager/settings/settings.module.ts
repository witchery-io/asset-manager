import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './containers/settings/settings.component';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [{ path: '', component: SettingsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot(),
  ],
  declarations: [
    SettingsComponent,
  ]
})
export class SettingsModule { }
