import { Action } from '@ngrx/store';
import { Order } from '@app/shared/intefaces/order.interface';
import { Settings } from '@trading/reducers/settings.reducers';

export const LOAD_ORDERS = '[SETTINGS] Load Orders';
export const ORDERS_LOADED = '[SETTINGS] Orders Loaded';
export const ORDERS_NOT_LOADED = '[SETTINGS] Orders Not Loaded';

export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;
  constructor(public payload: Settings) {}
}

export class OrdersLoaded implements Action {
  readonly type = ORDERS_LOADED;
  constructor(public payload: { orders: Order[] }) {}
}

export class OrdersNotLoaded implements Action {
  readonly type = ORDERS_NOT_LOADED;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  LoadOrders
  | OrdersLoaded
  | OrdersNotLoaded;
