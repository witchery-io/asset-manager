import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
  ]
})
export class LoginModule {
}
