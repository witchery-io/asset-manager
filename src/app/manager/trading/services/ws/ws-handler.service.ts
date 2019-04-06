import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '@trading/services/ws/web-socket.service';
import { WSActionHandlerServer } from '@trading/services/ws/ws-action-handler-server.service';
import { WSActionHandlerClient } from '@trading/services/ws/ws-action-handler-client.service';

@Injectable()
export class WsHandlerService {
  private tradingSubscription: Subscription;
  private connectionStateUpdateSubscription: Subscription;

  constructor(
    private ws: WebSocketService,
    private wsActionHandlerServer: WSActionHandlerServer,
    private wsActionHandlerClient: WSActionHandlerClient,
  ) {
  }

  start() {
    this.clearSubscriptions();

    this.connectionStateUpdateSubscription = this.ws.connectionStateUpdate$.subscribe(data => {
      this.wsActionHandlerClient.notifyWebSocketServer(data);
    });

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

    if (this.connectionStateUpdateSubscription) {
      this.connectionStateUpdateSubscription.unsubscribe();
    }
  }
}
