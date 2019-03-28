import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { UpdateTick } from '@app/core/actions/tick.actions';
import { OrdersLoaded } from '@trading/actions/orders.actions';

@Injectable()
export class WSActionHandlerServer {

  constructor(
    private store: Store<TradingState>,
  ) {
  }

  static parseParams(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    return {
      key: keys[0],
      value: values[0],
    };
  }

  /**
   * Handle server events(from other customers)
   */
  onWSData(data: any) {
    const params = WSActionHandlerServer.parseParams(data);

    switch (params.key) {
      case 'tickers':
        console.log('tickers', params.value);
        break;
      case 'ticker':
        // this.store.dispatch(new UpdateTick({tick: params.value}));
        break;
      case 'gos':
      case 'aos':
        console.log('gos', params.value);
        this.store.dispatch(new OrdersLoaded({orders: params.value}));
        break;
      case 'gno':
      case 'ano':
        console.log('gno', params.value);
        break;
      case 'goc':
      case 'aoc':
        console.log('goc', params.value);
        break;
      case 'goe':
      case 'aoe':
        console.log('goe', params.value);
        break;
      case 'gps':
      case 'aps':
        console.log('gps', params.value);
        break;
      case 'gnp':
      case 'anp':
        console.log('gnp', params.value);
        break;
      case 'gou':
      case 'aou':
        console.log('gou', params.value);
        break;
      case 'gpc':
      case 'apc':
        console.log('gpc', params.value);
        break;
      case 'gbs':
      case 'abs':
        console.log('gbs', params.value);
        break;
      case 'gbu':
      case 'abu':
        console.log('gbu', params.value);
        break;
    }
  }
}
