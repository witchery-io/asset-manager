import { Action } from '@ngrx/store';
import { Position } from '@app/shared/intefaces/position.interface';

export const LOAD_POSITIONS = '[TRADING] Load Positions';
export const UPDATE_POSITIONS = '[TRADING] Update Positions';
export const UPDATE_POSITION_ITEMS = '[SETTINGS] Update Positions Items';
export const POSITIONS_LOADED = '[TRADING] Positions Loaded';
export const POSITIONS_NOT_LOADED = '[TRADING] Positions Not Loaded';

export class LoadPositions implements Action {
  readonly type = LOAD_POSITIONS;

  constructor(public payload: { id: string, type: string, groupByPair: boolean }) {
  }
}

export class UpdatePositions implements Action {
  readonly type = UPDATE_POSITIONS;

  constructor(public payload: { id: string, type: string, groupByPair: boolean }) {
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

export type Actions =
  LoadPositions
  | UpdatePositions
  | UpdatePositionItems
  | PositionsLoaded
  | PositionsNotLoaded;
