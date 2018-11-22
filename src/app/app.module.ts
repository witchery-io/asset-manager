import {
  NgModule,
} from '@angular/core';
import {
  BrowserModule,
} from '@angular/platform-browser';
import {
  HttpClientModule,
} from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {
  AppRoutingModule,
} from './app-routing.module';
import {
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  TabsModule,
} from 'ngx-bootstrap/tabs';
import {
  ModalModule,
} from 'ngx-bootstrap/modal';
import {
  CollapseModule,
} from 'ngx-bootstrap/collapse';
import {
  AlertModule,
} from 'ngx-bootstrap/alert';
import {
  TooltipModule,
} from 'ngx-bootstrap/tooltip';
import {
  NgxSpinnerModule,
} from 'ngx-spinner';
import {
  Ng2SmartTableModule,
} from 'ng2-smart-table';
import {
  NotifierModule,
} from 'angular-notifier';
import {
  AppComponent,
} from './app.component';
import {
  MainComponent,
  SettingsComponent,
  GroupsComponent,
  AccountsComponent,
  BalanceComponent,
  OrderComponent,
  TradingComponent,
  BotsComponent,
  ButtonViewComponent,
  TemplateComponent,
  BotComponent,
  BotOrderComponent,
  OrderItemComponent,
  StatusBarComponent,
  TvChartComponent,
} from './components';
import {
  DashboardComponent,
} from './containers';
import {
  ArraySortPipe,
} from './pipes/array-sort.pipe';
import {
  library,
} from '@fortawesome/fontawesome-svg-core';
import {
  fas,
} from '@fortawesome/free-solid-svg-icons';
library.add(fas);

@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent,
    MainComponent,
    SettingsComponent,
    TradingComponent,
    BotsComponent,
    GroupsComponent,
    AccountsComponent,
    BalanceComponent,
    OrderComponent,
    TemplateComponent,
    BotComponent,
    BotOrderComponent,
    OrderItemComponent,
    StatusBarComponent,
    TvChartComponent,
    ButtonViewComponent,
    ArraySortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    Ng2SmartTableModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        },
      },
    }),
  ],
  entryComponents: [ButtonViewComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
