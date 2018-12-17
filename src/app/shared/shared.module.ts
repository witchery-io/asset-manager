import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent, OrderComponent, PositionComponent, PositionsComponent } from '@app/shared/components';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    OrdersComponent,
    PositionsComponent,
  ],
  declarations: [
    OrdersComponent,
    OrderComponent,
    PositionsComponent,
    PositionComponent,
  ],
  providers: [
  ],
})
export class SharedModule { }
