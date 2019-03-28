import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '@trading/services/ws/web-socket.service';
import { ApiService } from '@app/core/services';

@Injectable()
export class WsHandlerService {

  private ticksSubscription: Subscription;

  private channelId: string;

  private channel: any;

  constructor(
    private ws: WebSocketService,
    private apiService: ApiService,
  ) {
  }

  start(channelId?: string, channel?: any) {
    /*    if (channelId === '') {
          return ;
        }*/

    this.channel = channel;
    this.channelId = channelId;

    this.ticksSubscription = this.ws.ticks$
      .subscribe(data => {
        console.log(27, 'TICKS', data);
      });

    this.ws.connectionStateUpdate$
      .subscribe(data => {
        console.log(31, 'CONNECTION STATE UPDATE', data);
      });

    this.ws.message$
      .subscribe(data => {
        console.log(35, 'MESSAGE', data);
      });

    console.log(19, 'START');

    const token = this.apiService.authKey;
    const params = [
/*      {
        name: 'token',
        value: token,
      },*/
    ];

    this.ws.start(channel, params);
  }
}
