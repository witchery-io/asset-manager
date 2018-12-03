import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import * as services from '../services';
import * as components from '../components';
import * as guards from '../guards';
import {
  TabsModule,
  ModalModule,
  CollapseModule,
  AlertModule,
  TooltipModule,
} from 'ngx-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from '../helpers';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
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
    components.ButtonViewComponent,
    components.SettingsComponent,
    components.TradingComponent,
    components.BotsComponent,
    components.GroupsComponent,
    components.AccountsComponent,

    components.BalanceComponent,
    components.BalanceBarComponent,

    components.OrderComponent,
    components.PositionsComponent,
    components.PositionItemComponent,
    components.OrdersComponent,
    components.OrderItemComponent,

    components.TemplateComponent,

    components.BotComponent,
    components.BotOrderComponent,
    components.BotOrderItemComponent,

    components.StatusBarComponent,
    components.LoginComponent,
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
    services.AuthenticationService,
    services.UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    guards.AuthGuard,
  ],
  entryComponents: [
    components.ButtonViewComponent,
  ],
})
export class CoreModule { }
