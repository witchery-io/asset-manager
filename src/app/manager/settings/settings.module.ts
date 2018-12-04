import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SettingsComponent } from './containers';
import { AccountsComponent, GroupsComponent } from './components';

@NgModule({
  declarations: [
    SettingsComponent,
    AccountsComponent,
    GroupsComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
  ]
})
export class SettingsModule { }
