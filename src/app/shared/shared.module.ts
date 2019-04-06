import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OrdersComponent,
  OrderComponent,
  PositionComponent,
  PositionsComponent,
  NavBarComponent,
  MarketComponent,
} from '@app/shared/components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule, CollapseModule, ModalModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { INTERCEPTOR_PROVIDERS } from '@app/core/interceptors';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
    FilterPipeModule,
    OrderModule,
    ScrollingModule,
    MarketComponent,
  ],
  declarations: [
    OrdersComponent,
    OrderComponent,
    PositionsComponent,
    PositionComponent,
    NavBarComponent,
    MarketComponent,
  ],
  providers: [
    ...INTERCEPTOR_PROVIDERS,
  ],
})
export class SharedModule {
}
