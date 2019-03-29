import { Action } from '@ngrx/store';
import { Order } from '@app/shared/intefaces/order.interface';

export const LOAD_ORDERS = '[TRADING] Load Orders';
export const UPDATE_ORDERS = '[TRADING] Update Orders';
export const UPDATE_ORDER = '[TRADING] Update Order';
export const ORDERS_LOADED = '[TRADING] Orders Loaded';
export const ORDERS_NOT_LOADED = '[TRADING] Orders Not Loaded';
export const ORDER_CANCEL = '[TRADING] Order Cancel';
export const ORDER_DELETE = '[TRADING] Order Delete';
export const ORDER_ADD = '[TRADING] Order Add';
export const ORDER_PLACE = '[TRADING] Order Place';

export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;

  constructor(public payload: { id: string, type: string }) {
  }
}

export class UpdateOrders implements Action {
  readonly type = UPDATE_ORDERS;

  constructor(public payload: { orders: Order[] }) {
  }
}

export class UpdateOrder implements Action {
  readonly type = UPDATE_ORDER;

  constructor(public payload: Order) {
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
  | UpdateOrders
  | OrdersLoaded
  | OrdersNotLoaded
  | OrderCancel
  | UpdateOrder
  | OrderDelete
  | OrderAdd
  | OrderPlace;
