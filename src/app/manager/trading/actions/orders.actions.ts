import { Action } from '@ngrx/store';
import { Order } from '@app/shared/intefaces/order.interface';

export const LOAD_ORDERS = '[TRADING] Load Orders';
export const ORDERS_LOADED = '[TRADING] Orders Loaded';
export const ORDERS_NOT_LOADED = '[TRADING] Orders Not Loaded';

export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;
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
