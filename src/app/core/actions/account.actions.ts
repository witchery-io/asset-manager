import { Action } from '@ngrx/store';
import { Account } from '@app/core/intefaces';

export const LOAD_ACCOUNTS = '[CORE] Load Accounts';
export const UPDATE_ACCOUNTS = '[CORE] Update Accounts';
export const ACCOUNTS_LOADED = '[CORE] Accounts Loaded';
export const ACCOUNTS_NOT_LOADED = '[CORE] Accounts Not Loaded';


export class LoadAccounts implements Action {
  readonly type = LOAD_ACCOUNTS;
}

export class UpdateAccounts implements Action {
  readonly type = UPDATE_ACCOUNTS;
}

export class AccountsLoaded implements Action {
  readonly type = ACCOUNTS_LOADED;
  constructor(public payload: { accounts: Account[] }) {}
}

export class AccountsNotLoaded implements Action {
  readonly type = ACCOUNTS_NOT_LOADED;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  LoadAccounts
  | UpdateAccounts
  | AccountsLoaded
  | AccountsNotLoaded;
