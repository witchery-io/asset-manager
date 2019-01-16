import { Action } from '@ngrx/store';

export const LOAD_ACCOUNT = '[SETTINGS] Load Account';
export const ACCOUNT_LOADED = '[SETTINGS] Account Loaded';
export const ACCOUNT_NOT_LOADED = '[SETTINGS] Account Not Loaded';

export class LoadAccount implements Action {
  readonly type = LOAD_ACCOUNT;

  constructor(public payload: any) {
  }
}

export class AccountLoaded implements Action {
  readonly type = ACCOUNT_LOADED;

  constructor(public payload: { account: any }) {
  }
}

export class AccountNotLoaded implements Action {
  readonly type = ACCOUNT_NOT_LOADED;

  constructor(public payload: { error: string }) {
  }
}

export type Actions =
  LoadAccount
  | AccountLoaded
  | AccountNotLoaded;
