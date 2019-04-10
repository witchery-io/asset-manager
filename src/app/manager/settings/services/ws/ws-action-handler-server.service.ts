import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TicksLoaded, UpdateTick } from '@app/core/actions/tick.actions';
import { OrderAdd, OrderDelete, OrdersLoaded, OrderUpdate } from '@settings/actions/orders.actions';
import { Order } from '@app/shared/intefaces/order.interface';
import { Position } from '@app/shared/intefaces/position.interface';
import { History } from '@app/shared/intefaces/history.interface';
import { Tick } from '@app/core/intefaces';
import { PositionAdd, PositionDelete, PositionsLoaded, PositionsUpdateDetails, UpdatePosition } from '@settings/actions/positions.actions';
import { Balance } from '@app/shared/intefaces/balance.interface';
import { BalanceLoaded, BalanceUpdate } from '@settings/actions/balance.actions';
import { SettingsState } from '@settings/reducers';
import { HistoryAdd } from '@settings/actions/history.actions';

@Injectable()
export class WSActionHandlerServer {

  constructor(
    private store: Store<SettingsState>,
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
        this.store.dispatch(new TicksLoaded({ticks: params.value as Tick[]}));
        break;
      case 'ticker':
        this.store.dispatch(new PositionsUpdateDetails(params.value as Tick));
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
        const order = params.value as Order;
        // Math module values are same
        if (Math.abs(order.executedAmount) === Math.abs(order.originalAmount)) {
          this.store.dispatch(new OrderDelete((params.value as Order).orderNumber));
          break;
        }

        this.store.dispatch(new OrderUpdate(params.value as Order));
        break;
      case 'gps':
      case 'aps':
        this.store.dispatch(new PositionsLoaded({positions: params.value as Position[]}));
        break;
      case 'gnp':
      case 'anp':
        this.store.dispatch(new PositionAdd(params.value as Position));
        break;
      case 'gpu':
      case 'apu':
        this.store.dispatch(new PositionDelete((params.value as Position).id));
        this.store.dispatch(new HistoryAdd(params.value as History));
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
        this.store.dispatch(new BalanceUpdate(params.value as Balance));
        break;
    }
  }
}
