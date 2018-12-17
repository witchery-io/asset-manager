import { Injectable } from '@angular/core';
import { WebSocketService as WebSocketServiceBase } from '@app/core/services';
import { Subject } from 'rxjs';

@Injectable()
export class WebSocketService extends WebSocketServiceBase {

  ticks$ = new Subject<any>();

  constructor() {
    super();
  }

  send(data) {
    console.log(15, 'SEND');
    if (this.isOpenedState) {
      this.ws$.next(data);
    }
  }

  handleServerMessage(message: any) {
    this.ticks$.next(message);
  }
}