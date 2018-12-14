import { Action } from '@ngrx/store';
import { Moment } from 'moment';

export interface PerCurrencyBalance {
  currency: string;
  exchange: Array<string> | null;
  funding:  Array<string> | null;
  margin:  Array<string> | null;
}

export interface Balance {
  balance: number;
  base_currency: string;
  equity: number;
  exposure: number;
  last_updated: Moment;
  per_currency_balances: PerCurrencyBalance[];
  pl: number;
  total_pl: number;
  wsb: number;
}

export const LOAD_ORDERS = '[CORE] Load Orders';
export const ORDERS_LOADED = '[CORE] Orders Loaded';
export const ORDERS_NOT_LOADED = '[CORE] Orders Not Loaded';


export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;
}

export class OrdersLoaded implements Action {
  readonly type = ORDERS_LOADED;
  constructor(public payload: { balance: Balance }) {}
}

export class OrdersNotLoaded implements Action {
  readonly type = ORDERS_NOT_LOADED;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  LoadOrders
  | OrdersLoaded
  | OrdersNotLoaded;
