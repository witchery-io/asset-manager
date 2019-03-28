import { Injectable } from '@angular/core';
import { WebSocketService as WebSocketServiceBase } from '@app/core/services';
import { Subject } from 'rxjs';

@Injectable()
export class WebSocketService extends WebSocketServiceBase {

  trading$ = new Subject<any>();

  constructor() {
    super();
  }

  send(data) {
    this.ws$.next(data);
  }

  handleServerMessage(message: any) {
    this.trading$.next(message);
  }
}
