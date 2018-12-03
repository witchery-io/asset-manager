import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import * as services from '../services';
import * as components from '../components';
import * as guards from '../guards';
import {
  ModalModule,
  CollapseModule,
  BsDropdownModule,
} from 'ngx-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from '../helpers';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    Ng2SmartTableModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  exports: [
    CollapseModule,
    BsDropdownModule,
    FontAwesomeModule,
  ],
  declarations: [
    components.BotsComponent,
    components.BotComponent,
    components.BotOrderComponent,
    components.BotOrderItemComponent,
    components.TemplateComponent,
    components.LoginComponent,
    components.OrderComponent,
    components.SettingsComponent,
    components.AccountsComponent,
    components.GroupsComponent,
    components.BalanceComponent,
    components.TradingComponent,
    components.StatusBarComponent,
    components.ButtonViewComponent,
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
