import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from '@settings/settings-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { SettingsComponent } from '@settings/containers';
import { AccountsComponent, GroupsComponent } from '@settings/components';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@settings/reducers';

@NgModule({
  declarations: [
    SettingsComponent,
    AccountsComponent,
    GroupsComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    StoreModule.forFeature('settings', reducers),
  ]
})
export class SettingsModule { }
