import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent, OrderComponent, PositionComponent, PositionsComponent, NavBarComponent } from '@app/shared/components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  exports: [
    OrdersComponent,
    PositionsComponent,
    NavBarComponent,
  ],
  declarations: [
    OrdersComponent,
    OrderComponent,
    PositionsComponent,
    PositionComponent,
    NavBarComponent,
  ],
  providers: [],
})
export class SharedModule {
}
