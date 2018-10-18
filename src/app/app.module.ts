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
import { HttpClientModule } from '@angular/common/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ArraySortPipe } from './pipes/array-sort.pipe';
import { HighchartsChartModule } from 'highcharts-angular';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2TableModule,
    HighchartsChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
