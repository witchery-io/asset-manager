import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '@settings/services/ws/web-socket.service';
import { WSActionHandlerServer } from '@settings/services/ws/ws-action-handler-server.service';
import { WSActionHandlerClient } from '@settings/services/ws/ws-action-handler-client.service';

@Injectable()
export class WsHandlerService {
  private settingsSubscription: Subscription;
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

    this.settingsSubscription = this.ws.settings$.subscribe(data => {
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
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }

    if (this.connectionStateUpdateSubscription) {
      this.connectionStateUpdateSubscription.unsubscribe();
    }
  }
}
