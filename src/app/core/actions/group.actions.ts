import { Action } from '@ngrx/store';
import { Group } from '@app/core/intefaces';

export const LOAD_GROUPS = '[CORE] Load Groups';
export const UPDATE_GROUP = '[CORE] Update Groups';
export const ADD_GROUP = '[CORE] Add Groups';
export const GROUPS_LOADED = '[CORE] Groups Loaded';
export const GROUPS_NOT_LOADED = '[CORE] Groups Not Loaded';


export class LoadGroups implements Action {
  readonly type = LOAD_GROUPS;
}

export class UpdateGroup implements Action {
  readonly type = UPDATE_GROUP;

  constructor(public payload: Group) {
  }
}

export class AddGroup implements Action {
  readonly type = ADD_GROUP;

  constructor(public payload: Group) {
  }
}

export class GroupsLoaded implements Action {
  readonly type = GROUPS_LOADED;

  constructor(public payload: { groups: Group[] }) {
  }
}

export class GroupsNotLoaded implements Action {
  readonly type = GROUPS_NOT_LOADED;

  constructor(public payload: { error: string }) {
  }
}

export type Actions =
  LoadGroups
  | UpdateGroup
  | AddGroup
  | GroupsLoaded
  | GroupsNotLoaded;
