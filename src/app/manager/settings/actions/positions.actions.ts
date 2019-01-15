import { Action } from '@ngrx/store';
import { Position } from '@app/shared/intefaces/position.interface';
import { Settings } from '@trading/reducers/settings.reducers';

export const LOAD_POSITIONS = '[SETTINGS] Load Positions';
export const POSITIONS_LOADED = '[SETTINGS] Positions Loaded';
export const POSITIONS_NOT_LOADED = '[SETTINGS] Positions Not Loaded';

export class LoadPositions implements Action {
  readonly type = LOAD_POSITIONS;

  constructor(public payload: Settings) {
  }
}

export class PositionsLoaded implements Action {
  readonly type = POSITIONS_LOADED;

  constructor(public payload: { positions: Position[] }) {
  }
}

export class PositionsNotLoaded implements Action {
  readonly type = POSITIONS_NOT_LOADED;

  constructor(public payload: { error: string }) {
  }
}

export type Actions =
  LoadPositions
  | PositionsLoaded
  | PositionsNotLoaded;
