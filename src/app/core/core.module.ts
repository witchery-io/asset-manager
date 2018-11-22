import { NgModule } from '@angular/core';
import * as services from '../services';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
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
  entryComponents: [],
})
export class CoreModule { }
