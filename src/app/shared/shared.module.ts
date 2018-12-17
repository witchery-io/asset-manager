import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent, OrderComponent, PositionComponent, PositionsComponent } from '@app/shared/components';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [],
  providers: [
    OrdersComponent,
    OrderComponent,
    PositionsComponent,
    PositionComponent,
  ],
})
export class SharedModule { }
