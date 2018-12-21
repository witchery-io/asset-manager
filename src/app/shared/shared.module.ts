import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent, OrderComponent, PositionComponent, PositionsComponent, NavBarComponent } from '@app/shared/components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule, CollapseModule, ModalModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    Ng2SmartTableModule,
  ],
  exports: [
    OrdersComponent,
    PositionsComponent,
    NavBarComponent,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    Ng2SmartTableModule,
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
