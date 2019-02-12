import { Action } from '@ngrx/store';
import { Position } from '@app/shared/intefaces/position.interface';

export const LOAD_POSITIONS = '[SETTINGS] Load Positions';
export const UPDATE_POSITIONS = '[SETTINGS] Update Positions';
export const UPDATE_POSITION_ITEMS = '[SETTINGS] Update Positions Items';
export const POSITIONS_LOADED = '[SETTINGS] Positions Loaded';
export const POSITIONS_NOT_LOADED = '[SETTINGS] Positions Not Loaded';
export const CLEAN_UP_POSITIONS = '[SETTINGS] Clean Up Positions';

export class LoadPositions implements Action {
  readonly type = LOAD_POSITIONS;

  constructor(public payload: any) {
  }
}

export class UpdatePositions implements Action {
  readonly type = UPDATE_POSITIONS;

  constructor(public payload: { id: string, type: string }) {
  }
}

export class UpdatePositionItems implements Action {
  readonly type = UPDATE_POSITION_ITEMS;

  constructor(public payload: { positions: Position[] }) {
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

export class CleanUpPositions implements Action {
  readonly type = CLEAN_UP_POSITIONS;
}

export type Actions =
  LoadPositions
  | UpdatePositions
  | UpdatePositionItems
  | PositionsLoaded
  | PositionsNotLoaded
  | CleanUpPositions;
