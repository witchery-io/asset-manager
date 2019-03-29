import { Injectable} from '@angular/core';
import { WebSocketService} from '@trading/services/ws/web-socket.service';

@Injectable()
export class WSActionHandlerClient {

  constructor(
    private ws: WebSocketService,
  ) {
  }
}
