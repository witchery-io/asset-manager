import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import * as components from './components';
import { TabsModule, TooltipModule } from 'ngx-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: 'not-found', component: components.NotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    [RouterModule.forRoot(routes)],
  ],
  declarations: [
    components.NotFoundComponent,
    components.TvChartComponent,
    components.OrdersComponent,
    components.OrderItemComponent,
    components.PositionsComponent,
    components.PositionItemComponent,
    components.BalanceBarComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    components.TvChartComponent,
    components.OrdersComponent,
    components.OrderItemComponent,
    components.PositionsComponent,
    components.PositionItemComponent,
    components.BalanceBarComponent,
  ],
})
export class SharedModule { }
