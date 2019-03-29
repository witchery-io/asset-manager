import { Action } from '@ngrx/store';
import { Position } from '@app/shared/intefaces/position.interface';

export const LOAD_POSITIONS = '[SETTINGS] Load Positions';
export const POSITIONS_LOADED = '[SETTINGS] Positions Loaded';
export const POSITIONS_NOT_LOADED = '[SETTINGS] Positions Not Loaded';
export const CLEAN_UP_POSITIONS = '[SETTINGS] Clean Up Positions';
export const POSITIONS_UPDATE = '[SETTINGS] Positions Update';
export const POSITION_UPDATE = '[SETTINGS] Position Update';
export const POSITION_CLOSE = '[SETTINGS] Position Close';
export const POSITION_DELETE = '[SETTINGS] Position Delete';
export const POSITION_ADD = '[SETTINGS] Position Add';
export const POSITION_PLACE = '[SETTINGS] Position Place';

export class LoadPositions implements Action {
  readonly type = LOAD_POSITIONS;

  constructor(public payload:  { id: string, type: string }) {
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

export class UpdatePositions implements Action {
  readonly type = POSITIONS_UPDATE;

  constructor(public payload: { positions: Position[] }) {
  }
}

export class UpdatePosition implements Action {
  readonly type = POSITION_UPDATE;

  constructor(public payload: Position) {
  }
}

export class PositionClose implements Action {
  readonly type = POSITION_CLOSE;

  constructor(public payload: Position) {
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
  | PositionsLoaded
  | PositionsNotLoaded
  | CleanUpPositions
  | UpdatePositions
  | UpdatePosition
  | PositionClose
  | PositionDelete
  | PositionPlace
  | PositionAdd;
