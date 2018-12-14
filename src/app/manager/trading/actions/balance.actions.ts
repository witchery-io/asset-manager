import { Action } from '@ngrx/store';
import { Balance } from '@app/shared/intefaces/balance.interface';

export const LOAD_BALANCE = '[CORE] Load Balance';
export const BALANCE_LOADED = '[CORE] Balance Loaded';
export const BALANCE_NOT_LOADED = '[CORE] Balance Not Loaded';

export class LoadBalance implements Action {
  readonly type = LOAD_BALANCE;
}

export class BalanceLoaded implements Action {
  readonly type = BALANCE_LOADED;
  constructor(public payload: { balance: Balance[] }) {}
}

export class BalanceNotLoaded implements Action {
  readonly type = BALANCE_NOT_LOADED;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  LoadBalance
  | BalanceLoaded
  | BalanceNotLoaded;
