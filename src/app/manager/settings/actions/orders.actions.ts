import { Action } from '@ngrx/store';
import { Order } from '@app/shared/intefaces/order.interface';

export const LOAD_ORDERS = '[SETTINGS] Load Orders';
export const UPDATE_ORDERS = '[SETTINGS] Update Orders';
export const ORDERS_LOADED = '[SETTINGS] Orders Loaded';
export const ORDERS_NOT_LOADED = '[SETTINGS] Orders Not Loaded';
export const CLEAN_UP_ORDERS = '[SETTINGS] Clean Up Orders';


export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;

  constructor(public payload: any) {
  }
}

export class UpdateOrders implements Action {
  readonly type = UPDATE_ORDERS;

  constructor(public payload: any) {
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
  | OrdersLoaded
  | OrdersNotLoaded
  | CleanUpOrders;
