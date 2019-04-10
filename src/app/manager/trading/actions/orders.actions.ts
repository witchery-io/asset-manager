import { Action } from '@ngrx/store';
import { Order } from '@app/shared/intefaces/order.interface';

export const LOAD_ORDERS = '[TRADING] Load Orders';
export const ORDERS_LOADED = '[TRADING] Orders Loaded';
export const ORDERS_NOT_LOADED = '[TRADING] Orders Not Loaded';
export const ORDERS_UPDATE = '[TRADING] Orders Update';
export const ORDER_UPDATE = '[TRADING] Order Update';
export const ORDER_CANCEL = '[TRADING] Order Cancel';
export const ORDER_CANCEL_SUCCESS = '[TRADING] Order Cancel Success';
export const ORDER_DELETE = '[TRADING] Order Delete';
export const ORDER_ADD = '[TRADING] Order Add';
export const ORDER_PLACE = '[TRADING] Order Place';
export const ORDER_PLACE_SUCCESS = '[TRADING] Order Place Success';

export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;

  constructor(public payload: { id: string, type: string }) {
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

export class OrderCancelSuccess implements Action {
  readonly type = ORDER_CANCEL_SUCCESS;
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

export class OrderPlaceSuccess implements Action {
  readonly type = ORDER_PLACE_SUCCESS;
}

export type Actions =
  LoadOrders
  | OrdersLoaded
  | OrdersNotLoaded
  | OrdersUpdate
  | OrderUpdate
  | OrderCancel
  | OrderCancelSuccess
  | OrderDelete
  | OrderAdd
  | OrderPlace
  | OrderPlaceSuccess;
