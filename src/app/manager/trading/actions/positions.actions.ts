import { Action } from '@ngrx/store';
import { Position } from '@app/shared/intefaces/position.interface';

export const LOAD_POSITIONS = '[TRADING] Load Positions';
export const UPDATE_POSITIONS = '[TRADING] Update Positions';
export const UPDATE_POSITION_ITEMS = '[TRADING] Update Positions Items';
export const POSITIONS_LOADED = '[TRADING] Positions Loaded';
export const POSITIONS_NOT_LOADED = '[TRADING] Positions Not Loaded';
export const POSITION_CLOSE = '[TRADING] Position Close';
export const POSITION_DELETE = '[TRADING] Position Delete';
export const POSITION_ADD = '[TRADING] Position Add';
export const POSITION_PLACE = '[TRADING] Position Place';

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

export class PositionClose implements Action {
  readonly type = POSITION_CLOSE;

  constructor(public payload: string) {
  }
}

export class PositionDelete implements Action {
  readonly type = POSITION_DELETE;

  constructor(public payload: string) {
  }
}

export class PositionPlace implements Action {
  readonly type = POSITION_PLACE;

  constructor(public payload: any) {
  }
}

export class PositionAdd implements Action {
  readonly type = POSITION_ADD;

  constructor(public payload: Position) {
  }
}

export type Actions =
  LoadPositions
  | UpdatePositions
  | UpdatePositionItems
  | PositionsLoaded
  | PositionsNotLoaded
  | PositionClose
  | PositionDelete
  | PositionPlace
  | PositionAdd;
