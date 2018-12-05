import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from '@settings/settings-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { SettingsComponent } from '@settings/containers';
import { AccountsComponent, GroupsComponent } from '@settings/components';

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
