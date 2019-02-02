import { Action } from '@ngrx/store';

export const LOAD_GROUP = '[SETTINGS] Load Group';
export const GROUP_LOADED = '[SETTINGS] Group Loaded';
export const GROUP_NOT_LOADED = '[SETTINGS] Group Not Loaded';
export const CLEAN_UP_GROUP = '[SETTINGS] Clean Up Group';

export class LoadGroup implements Action {
  readonly type = LOAD_GROUP;

  constructor(public payload: any) {
  }
}

export class GroupLoaded implements Action {
  readonly type = GROUP_LOADED;

  constructor(public payload: { group: any }) {
  }
}

export class GroupNotLoaded implements Action {
  readonly type = GROUP_NOT_LOADED;

  constructor(public payload: { error: string }) {
  }
}

export class CleanUpGroup implements Action {
  readonly type = CLEAN_UP_GROUP;
}

export type Actions =
  LoadGroup
  | GroupLoaded
  | GroupNotLoaded
  | CleanUpGroup;
