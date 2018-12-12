import { Injectable } from '@angular/core';
import { Subscription, Subject, zip, range, timer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { retryWhen, flatMap, map } from 'rxjs/operators';
import { getParams2str } from '@app/core/utils/websocket.utils';

@Injectable()
export class WebSocketService {

  protected ws$: WebSocketSubject<any>;
  protected socketSubscription: Subscription;
  protected baseUrl: string = environment.webSocketUrl;
  protected params: any[] = []; // WebSocketGetParam
  protected channel: string;

  message$ = new Subject<any>(); // WSServerMessage

  connectionStateUpdate$ = new Subject<any>(); // WSOpenState

  isOpenedState = false;

  constructor() { }

  start(channel: string, params?: any[]) {
    this.channel = channel;
    this.params = params || [];

    if (this.ws$) {
      this.close();
    }

    let url = `${ this.baseUrl }${ channel }`;

    if (params && params.length) {
      url += getParams2str(params);
    }

    this.ws$ = webSocket({ url });

    this.socketSubscription = this.ws$.pipe(
      retryWhen(errs$ => {
        return zip(errs$, range(1, 30))
          .pipe(
            map((_, i) => i),
            flatMap(i => {

              console.log(68, 'websocket connection reconnect');
              const message = 'websocket_connection_reconnect';

              this.isOpenedState = false;
              this.connectionStateUpdate$.next({ isOpened: false, message: message, isTryingToReconnect: true });

              return timer(i * 1000);
            }),
          );
      })).subscribe({
        next: (message: any) => {

          console.log(78, 'NEXT', message);

          if (!this.isOpenedState) {
            this.isOpenedState = true;

            this.connectionStateUpdate$.next({ isOpened: true, message: message });
          }

          this.handleServerMessage(message);
        },
        error: err => {
          console.error(89, 'ERROR', err);
        },
        complete: () => {

          console.error(91, 'COMPLETE - websocket connection lost');

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
    console.log(message.data);
    return this.message$.next(message.data);
  }
}
