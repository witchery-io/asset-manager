/*
 TODO
  1. current trading id ex.
   (6a86df61-c190-4347-9b61-34cbd88d38a4, 74f9b418-e7b0-440d-8523-c4ed9cbbe3cc, 7c894b77-fdcb-40e1-aa30-17dada9fa835)
  2. current trading type ex. (account, group)
  3. ...
  */

import { Action } from '@ngrx/store';
import { Settings } from '@trading/reducers/settings.reducers';

export const SETTINGS_SET = '[TRADING] SettingsSet';
export const SETTINGS_UPDATE = '[TRADING] SettingsUpdate';

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
