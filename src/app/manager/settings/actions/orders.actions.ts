import { Action } from '@ngrx/store';
import { Order } from '@app/shared/intefaces/order.interface';

export const LOAD_ORDERS = '[SETTINGS] Load Orders';
export const ORDERS_LOADED = '[SETTINGS] Orders Loaded';
export const ORDERS_NOT_LOADED = '[SETTINGS] Orders Not Loaded';
export const CLEAN_UP_ORDERS = '[SETTINGS] Clean Up Orders';
export const ORDERS_UPDATE = '[SETTINGS] Orders Update';
export const ORDER_UPDATE = '[SETTINGS] Order Update';
export const ORDER_CANCEL = '[SETTINGS] Order Cancel';
export const ORDER_DELETE = '[SETTINGS] Order Delete';
export const ORDER_ADD = '[SETTINGS] Order Add';
export const ORDER_PLACE = '[SETTINGS] Order Place';


export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;

  constructor(public payload:  { id: string, type: string }) {
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

export class OrdersUpdate implements Action {
  readonly type = ORDERS_UPDATE;

  constructor(public payload: { orders: Order[] }) {
  }
}

export class OrderUpdate implements Action {
  readonly type = ORDER_UPDATE;

  constructor(public payload: Order) {
  }
}

export class OrderCancel implements Action {
  readonly type = ORDER_CANCEL;

  constructor(public payload: Order) {
  }
}

export class OrderDelete implements Action {
  readonly type = ORDER_DELETE;

  constructor(public payload: string) {
  }
}

export class OrderAdd implements Action {
  readonly type = ORDER_ADD;

  constructor(public payload: Order) {
  }
}

export class OrderPlace implements Action {
  readonly type = ORDER_PLACE;

  constructor(public payload: any) {
  }
}

export type Actions =
  LoadOrders
  | OrdersLoaded
  | OrdersNotLoaded
  | CleanUpOrders
  | OrderCancel
  | OrdersUpdate
  | OrderUpdate
  | OrderDelete
  | OrderAdd
  | OrderPlace;
