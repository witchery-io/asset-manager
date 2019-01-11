import { Action } from '@ngrx/store';
import { Settings } from '@trading/reducers/settings.reducers';

export const SETTINGS_SET = '[SETTINGS] Settings Set';
export const SETTINGS_UPDATE = '[SETTINGS] Settings Update';

export class SettingsSet implements Action {
  readonly type = SETTINGS_SET;
  constructor(public payload: Settings) {}
}

export class SettingsUpdate implements Action {
  readonly type = SETTINGS_UPDATE;
  constructor(public payload: Settings) {}
}

export type Actions = SettingsSet
  | SettingsUpdate;