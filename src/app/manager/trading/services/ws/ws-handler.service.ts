import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '@trading/services/ws/web-socket.service';
import { WSActionHandlerServer } from '@trading/services/ws/ws-action-handler-server.service';

@Injectable()
export class WsHandlerService {
  private tradingSubscription: Subscription;

  constructor(
    private ws: WebSocketService,
    private wsActionHandlerServer: WSActionHandlerServer,
  ) {
  }

  start() {
    this.clearSubscriptions();

    this.tradingSubscription = this.ws.trading$.subscribe(data => {
      this.wsActionHandlerServer.onWSData(data);
    });

    this.ws.start('');
  }

  stop() {
    this.clearSubscriptions();
    this.ws.close();
  }

  /**
   * Unsubscribe all subscriptions.
   */
  private clearSubscriptions() {
    if (this.tradingSubscription) {
      this.tradingSubscription.unsubscribe();
    }
  }
}
