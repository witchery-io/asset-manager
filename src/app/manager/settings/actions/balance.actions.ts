import { Action } from '@ngrx/store';
import { Balance } from '@app/shared/intefaces/balance.interface';
import { Settings } from '@trading/reducers/settings.reducers';

export const LOAD_BALANCE = '[SETTINGS] Load Balance';
export const BALANCE_LOADED = '[SETTINGS] Balance Loaded';
export const BALANCE_NOT_LOADED = '[SETTINGS] Balance Not Loaded';

export class LoadBalance implements Action {
  readonly type = LOAD_BALANCE;
  constructor(public payload: Settings) {}
}

export class BalanceLoaded implements Action {
  readonly type = BALANCE_LOADED;
  constructor(public payload: { balance: Balance }) {}
}

export class BalanceNotLoaded implements Action {
  readonly type = BALANCE_NOT_LOADED;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  LoadBalance
  | BalanceLoaded
  | BalanceNotLoaded;
