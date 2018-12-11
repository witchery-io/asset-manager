import { Injectable } from '@angular/core';
import { Subscription, Subject, zip, range, timer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { retryWhen, flatMap, map } from 'rxjs/operators';
import { getParams2str } from '@app/core/utils/websocket.utils';

export interface WebSocketGetParam {
  name: string;
  value: string;
}

export interface WSServerMessage {
  type: string;
  data?: any;
}

export interface WSOpenState {
  isOpened: boolean;
  message?: string;
  store?: any;
  isTryingToReconnect?: boolean;
}

@Injectable()
export class WebSocketService {

  protected ws$: WebSocketSubject<any>;
  protected socketSubscription: Subscription;
  protected baseUrl: string = environment.webSocketUrl;
  protected params: WebSocketGetParam[] = [];
  protected channel: string;

  message$ = new Subject<WSServerMessage>();

  connectionStateUpdate$ = new Subject<WSOpenState>();

  isOpenedState = false;

  constructor() { }

  start(channel: string, params?: any[]) {
    this.channel = channel;
    this.params = params || [];

    if (this.ws$) {
      this.close();
    }

    let url = `${ this.baseUrl }`;

    if (params && params.length) {
      url += getParams2str(params);
    }

    this.ws$ = webSocket({ url });

    this.socketSubscription = this.ws$
      .pipe(retryWhen(errs$ => {
        return zip(errs$, range(1, 30))
          .pipe(
            map((_, i) => i),
            flatMap(i => {
              const message = 'websocket_connection_reconnect';

              this.isOpenedState = false;
              this.connectionStateUpdate$.next({ isOpened: false, message: message, isTryingToReconnect: true });

              return timer(i * 1000);
            }),
          );
      }))
      .subscribe({
        next: (message: any) => {
          if (!this.isOpenedState) {
            this.isOpenedState = true;

            this.connectionStateUpdate$.next({
              isOpened: true,
              message: message,
            });
          }

          this.handleServerMessage(message);
        },
        error: err => { console.error(err); },
        complete: () => {
          const message = 'websocket_connection_lost';
          this.connectionStateUpdate$.next({ isOpened: false, message: message });
        },
      });
  }

  close() {
    this.isOpenedState = false;
    this.connectionStateUpdate$.next({ isOpened: false });

    if (this.ws$) {
      this.ws$.complete();
    }

    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  restart() {
    this.close();
    this.start(this.channel, this.params);
  }

  handleServerMessage(message: any) {
    return this.message$.next(message.data);
  }
}
