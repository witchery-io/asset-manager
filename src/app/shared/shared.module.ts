import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceService, OrdersService, PositionsService } from '@app/shared/services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
  ],
  providers: [
    PositionsService,
    OrdersService,
    BalanceService,
  ],
})
export class SharedModule { }
