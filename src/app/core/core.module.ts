import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as services from '../services';
import * as components from '../components';
import {
  TabsModule,
  ModalModule,
  CollapseModule,
  AlertModule,
  TooltipModule,
} from 'ngx-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    FontAwesomeModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
  ],
  exports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    FontAwesomeModule,
  ],
  declarations: [
    components.MainComponent,
    components.ButtonViewComponent,
    components.SettingsComponent,
    components.TradingComponent,
    components.BotsComponent,
    components.GroupsComponent,
    components.AccountsComponent,
    components.BalanceComponent,
    components.OrderComponent,
    components.TemplateComponent,
    components.BotComponent,
    components.BotOrderComponent,
    components.OrderItemComponent,
    components.StatusBarComponent,
    components.TvChartComponent,
  ],
  providers: [
    services.AccountService,
    services.GroupsService,
    services.TickService,
    services.SharedService,
    services.PositionService,
    services.OrderService,
    services.ModalService,
    services.BotService,
    services.NotifierService,
  ],
  entryComponents: [
    components.ButtonViewComponent,
  ],
})
export class CoreModule { }
