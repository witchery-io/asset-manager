import { Action } from '@ngrx/store';
import { Moment } from 'moment';
import { OrderType } from '@trading/actions/orders.actions';

export interface Position {
  account: string;
  amount: number;
  close_order_number: string;
  commission: number;
  current_price: number;
  deleted_at: Moment;
  exchange: string;
  exposure: number;
  fee: number;
  group: string;
  info: string;
  last_updated: Moment;
  open_order_time: Moment;
  open_price: number;
  order_number: string;
  pair: string;
  parent_order_number: string;
  pl: number;
  plmain: number;
  plmprc: number;
  source_order_number: string;
  suborders: Position[];
  swap: number;
  type: OrderType;
  volume: number;
}

export const LOAD_POSITIONS = '[CORE] Load Positions';
export const POSITIONS_LOADED = '[CORE] Positions Loaded';
export const POSITIONS_NOT_LOADED = '[CORE] Positions Not Loaded';

export class LoadPositions implements Action {
  readonly type = LOAD_POSITIONS;
}

export class PositionsLoaded implements Action {
  readonly type = POSITIONS_LOADED;
  constructor(public payload: { positions: Position[] }) {}
}

export class PositionsNotLoaded implements Action {
  readonly type = POSITIONS_NOT_LOADED;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  LoadPositions
  | PositionsLoaded
  | PositionsNotLoaded;
