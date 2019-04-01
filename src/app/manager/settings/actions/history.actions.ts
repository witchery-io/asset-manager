import { Action } from '@ngrx/store';
import { History } from '@app/shared/intefaces/history.interface';

export const LOAD_HISTORIES = '[SETTINGS] Load Histories';
export const HISTORIES_LOADED = '[SETTINGS] Histories Loaded';
export const HISTORIES_NOT_LOADED = '[SETTINGS] Histories Not Loaded';
export const HISTORY_ADD = '[SETTINGS] History Add';


export class LoadHistories implements Action {
  readonly type = LOAD_HISTORIES;

  constructor(public payload: { id: string }) {
  }
}

export class HistoriesLoaded implements Action {
  readonly type = HISTORIES_LOADED;

  constructor(public payload: { histories: History[] }) {
  }
}

export class HistoriesNotLoaded implements Action {
  readonly type = HISTORIES_NOT_LOADED;

  constructor(public payload: { error: string }) {
  }
}

export class HistoryAdd implements Action {
  readonly type = HISTORY_ADD;

  constructor(public payload: History) {
  }
}

export type Actions =
  LoadHistories
  | HistoriesLoaded
  | HistoriesNotLoaded
  | HistoryAdd;
