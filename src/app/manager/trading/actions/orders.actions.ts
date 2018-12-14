import { Action } from '@ngrx/store';

export interface OrderType {
  direction: number;
  type: number;
  context: number;
}

export interface Order {
  order_number: string;
  amount: number;
  close_order_number: string;
  commission: number;
  current_price: number;
  exchange: string;
  account: string;
  group: string;
  info: string;
  open_order_time: Date;
  open_price: number;
  parent_order_number: string;
  pair: string;
  pl: number;
  pl_main: number;
  pl_mprc: number;
  source_order_number: string;
  swap: number;
  volume: number;
  type: OrderType;
  sub_orders: Order[];
  last_updated: Date;
  deleted_at: Date;
}

export const LOAD_ORDERS = '[CORE] Load Orders';
export const ORDERS_LOADED = '[CORE] Orders Loaded';
export const ORDERS_NOT_LOADED = '[CORE] Orders Not Loaded';


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
