import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SettingsComponent } from './components/settings/settings.component';
import { GroupsComponent } from './components/settings/groups/groups.component';
import { AccountsComponent } from './components/settings/accounts/accounts.component';
import { BalanceComponent } from './components/settings/balance/balance.component';
import { OrderComponent } from './components/settings/order/order.component';
import { TradingComponent } from './components/trading/trading.component';
import { BotsComponent } from './components/bots/bots.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { NgxSpinnerModule } from 'ngx-spinner';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ArraySortPipe } from './pipes/array-sort.pipe';
import { TemplateComponent } from './components/bots/templates/template.component';
import { BotComponent } from './components/bots/templates/bot/bot.component';
import { BotOrderComponent } from './components/bots/templates/bot/bot-order/bot-order.component';
import { OrderItemComponent } from './components/bots/templates/bot/bot-order/order-item/order-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusBarComponent } from './components/trading/status-bar/status-bar.component';
import { TvChartComponent } from './components/tv-chart/tv-chart.component';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SettingsComponent,
    TradingComponent,
    BotsComponent,
    ArraySortPipe,
    GroupsComponent,
    AccountsComponent,
    BalanceComponent,
    OrderComponent,
    TemplateComponent,
    BotComponent,
    BotOrderComponent,
    OrderItemComponent,
    DashboardComponent,
    StatusBarComponent,
    TvChartComponent,
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
    Ng2TableModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
