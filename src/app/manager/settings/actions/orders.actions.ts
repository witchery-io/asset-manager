import { Action } from '@ngrx/store';
import { Order } from '@app/shared/intefaces/order.interface';

export const LOAD_ORDERS = '[SETTINGS] Load Orders';
export const UPDATE_ORDERS = '[SETTINGS] Update Orders';
export const UPDATE_ORDER_ITEMS = '[SETTINGS] Update Order Items';
export const ORDERS_LOADED = '[SETTINGS] Orders Loaded';
export const ORDERS_NOT_LOADED = '[SETTINGS] Orders Not Loaded';
export const CLEAN_UP_ORDERS = '[SETTINGS] Clean Up Orders';


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

export class CleanUpOrders implements Action {
  readonly type = CLEAN_UP_ORDERS;
}

export type Actions =
  LoadOrders
  | UpdateOrders
  | UpdateOrderItems
  | OrdersLoaded
  | OrdersNotLoaded
  | CleanUpOrders;
