import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class WSActionHandlerClient {

  constructor(
    private notifierService: NotifierService,
  ) {
  }

  notifyWebSocketServer(data) {
    if (data.isOpened) {
      this.notifierService.notify('info', 'Websocket has connected');
    } else {
      this.notifierService.notify('info', data.message);
    }
  }
}
