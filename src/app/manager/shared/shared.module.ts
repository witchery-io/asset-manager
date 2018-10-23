import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { AccountService } from './services/account.service';
import { BotService } from './services/bot.service';
import { GroupsService } from './services/groups.service';
import { ModalService } from './services/modal.service';
import { OrderService } from './services/order.service';
import { PositionService } from './services/position.service';
import { TickService } from './services/tick.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

//  todo :: will changed

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FormsModule,
    HttpClientModule,
    Ng2TableModule,
    HighchartsChartModule,
  ],
  declarations: [
  ],
  exports: [
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AccountService,
        BotService,
        GroupsService,
        ModalService,
        OrderService,
        PositionService,
        TickService,
      ],
    };
  }

}
