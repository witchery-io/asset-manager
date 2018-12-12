import { Injectable } from '@angular/core';
import { WebSocketService as WebSocketServiceBase } from '@app/core/services';

@Injectable()
export class WebSocketService extends WebSocketServiceBase {

  constructor() {
    super();
  }
}
