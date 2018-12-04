import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService, GroupService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
  ],
  providers: [
    GroupService,
    AccountService,
  ],
})
export class SharedModule { }
