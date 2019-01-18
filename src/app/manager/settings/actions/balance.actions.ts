import { Action } from '@ngrx/store';
import { Balance } from '@app/shared/intefaces/balance.interface';

export const LOAD_BALANCE = '[SETTINGS] Load Balance';
export const BALANCE_LOADED = '[SETTINGS] Balance Loaded';
export const BALANCE_NOT_LOADED = '[SETTINGS] Balance Not Loaded';
export const CLEAN_UP_BALANCE = '[SETTINGS] Clean Up Balance';

export class LoadBalance implements Action {
  readonly type = LOAD_BALANCE;

  constructor(public payload: any) {
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

export class CleanUpBalance implements Action {
  readonly type = CLEAN_UP_BALANCE;
}

export type Actions =
  LoadBalance
  | BalanceLoaded
  | BalanceNotLoaded
  | CleanUpBalance;
