import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { TicksLoaded, UpdateTick } from '@app/core/actions/tick.actions';
import { OrderAdd, OrderDelete, OrdersLoaded, UpdateOrder } from '@trading/actions/orders.actions';
import { Order } from '@app/shared/intefaces/order.interface';
import { Position } from '@app/shared/intefaces/position.interface';
import { Tick } from '@app/core/intefaces';
import { PositionAdd, PositionDelete, PositionsLoaded, UpdatePosition } from '@trading/actions/positions.actions';
import { Balance } from '@app/shared/intefaces/balance.interface';
import { BalanceLoaded, UpdateBalance } from '@trading/actions/balance.actions';

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
  onWSData(data: Object) {
    const params = WSActionHandlerServer.parseParams(data);

    switch (params.key) {
      case 'tickers':
        this.store.dispatch(new TicksLoaded({ticks: params.value as Tick[]}));
        break;
      case 'ticker':
        this.store.dispatch(new UpdateTick({tick: params.value as Tick}));
        break;
      case 'gos':
      case 'aos':
        this.store.dispatch(new OrdersLoaded({orders: params.value as Order[]}));
        break;
      case 'gno':
      case 'ano':
        this.store.dispatch(new OrderAdd(params.value as Order));
        break;
      case 'goc':
      case 'aoc':
        this.store.dispatch(new OrderDelete((params.value as Order).orderNumber));
        break;
      case 'goe':
      case 'aoe':
        this.store.dispatch(new UpdateOrder(params.value as Order));
        break;
      case 'gps':
      case 'aps':
        this.store.dispatch(new PositionsLoaded({positions: params.value as Position[]}));
        break;
      case 'gnp':
      case 'anp':
        this.store.dispatch(new PositionAdd(params.value as Position));
        break;
      case 'gou':
      case 'aou':
        this.store.dispatch(new PositionDelete((params.value as Position).id));
        break;
      case 'gpc':
      case 'apc':
        this.store.dispatch(new UpdatePosition(params.value as Position));
        break;
      case 'gbs':
      case 'abs':
        this.store.dispatch(new BalanceLoaded({balance: params.value as Balance}));
        break;
      case 'gbu':
      case 'abu':
        this.store.dispatch(new UpdateBalance(params.value as Balance));
        break;
    }
  }
}
