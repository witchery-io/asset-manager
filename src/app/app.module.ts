import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  TabsModule, ModalModule, CollapseModule, AlertModule, TooltipModule
} from 'ngx-bootstrap';

import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NotifierModule } from 'angular-notifier';

import { AppComponent } from './app.component';
import * as components from './components';
import * as containers from './containers';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    containers.DashboardComponent,
    components.MainComponent,
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
    components.ButtonViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
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
  entryComponents: [
    components.ButtonViewComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
