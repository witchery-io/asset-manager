import { Action } from '@ngrx/store';
import { Order } from '@app/shared/intefaces/order.interface';

export const LOAD_ORDERS = '[TRADING] Load Orders';
export const UPDATE_ORDERS = '[TRADING] Update Orders';
export const UPDATE_ORDER_ITEMS = '[SETTINGS] Update Order Items';
export const ORDERS_LOADED = '[TRADING] Orders Loaded';
export const ORDERS_NOT_LOADED = '[TRADING] Orders Not Loaded';

export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;

  constructor(public payload:  { id: string, type: string }) {
  }
}

export class UpdateOrders implements Action {
  readonly type = UPDATE_ORDERS;

  constructor(public payload: { id: string, type: string }) {
  }
}

export class UpdateOrderItems implements Action {
  readonly type = UPDATE_ORDER_ITEMS;

  constructor(public payload: { orders: Order[] }) {
  }
}

export class OrdersLoaded implements Action {
  readonly type = ORDERS_LOADED;

  constructor(public payload: { orders: Order[] }) {
  }
}

export class OrdersNotLoaded implements Action {
  readonly type = ORDERS_NOT_LOADED;

  constructor(public payload: { error: string }) {
  }
}

export type Actions =
  LoadOrders
  | UpdateOrders
  | UpdateOrderItems
  | OrdersLoaded
  | OrdersNotLoaded;
