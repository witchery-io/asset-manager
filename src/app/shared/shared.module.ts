import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent, OrderComponent, PositionComponent, PositionsComponent } from '@app/shared/components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
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
  providers: [],
})
export class SharedModule {
}
