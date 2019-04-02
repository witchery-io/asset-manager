import { Action } from '@ngrx/store';
import { Balance } from '@app/shared/intefaces/balance.interface';

export const LOAD_BALANCE = '[TRADING] Load Balance';
export const UPDATE_BALANCE = '[TRADING] Update Balance';
export const BALANCE_LOADED = '[TRADING] Balance Loaded';
export const BALANCE_NOT_LOADED = '[TRADING] Balance Not Loaded';

export class LoadBalance implements Action {
  readonly type = LOAD_BALANCE;

  constructor(public payload:  { id: string, type: string }) {
  }
}

export class UpdateBalance implements Action {
  readonly type = UPDATE_BALANCE;

  constructor(public payload: Balance) {
  }
}

export class BalanceLoaded implements Action {
  readonly type = BALANCE_LOADED;

  constructor(public payload: { balance: Balance }) {
  }
}

export class BalanceNotLoaded implements Action {
  readonly type = BALANCE_NOT_LOADED;

  constructor(public payload: { error: string }) {
  }
}

export type Actions =
  LoadBalance
  | UpdateBalance
  | BalanceLoaded
  | BalanceNotLoaded;
