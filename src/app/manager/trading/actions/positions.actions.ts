import { Action } from '@ngrx/store';
import { Position } from '@app/shared/intefaces/position.interface';
import { Tick } from '@app/core/intefaces';

export const LOAD_POSITIONS = '[TRADING] Load Positions';
export const UPDATE_POSITIONS = '[TRADING] Update Positions';
export const UPDATE_POSITION = '[TRADING] Update Position';
export const UPDATE_OR_ADD_POSITION = '[TRADING] Update Or Add Position';
export const POSITIONS_LOADED = '[TRADING] Positions Loaded';
export const POSITIONS_NOT_LOADED = '[TRADING] Positions Not Loaded';
export const POSITION_CLOSE = '[TRADING] Position Close';
export const POSITION_CLOSE_SUCCESS = '[TRADING] Position Close Success';
export const POSITION_DELETE = '[TRADING] Position Delete';
export const POSITION_ADD = '[TRADING] Position Add';
export const POSITION_PLACE = '[TRADING] Position Place';
export const POSITION_PLACE_SUCCESS = '[TRADING] Position Place Success';
export const POSITIONS_UPDATE_DETAILS = '[TRADING] Positions Update Details';

export class LoadPositions implements Action {
  readonly type = LOAD_POSITIONS;

  constructor(public payload: { id: string, type: string, groupByPair: boolean }) {
  }
}

export class UpdatePositions implements Action {
  readonly type = UPDATE_POSITIONS;

  constructor(public payload: { positions: Position[] }) {
  }
}

export class UpdatePosition implements Action {
  readonly type = UPDATE_POSITION;

  constructor(public payload: Position) {
  }
}

export class UpdateOrAddPosition implements Action {
  readonly type = UPDATE_OR_ADD_POSITION;

  constructor(public payload: Position) {
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

  constructor(public payload: Position) {
  }
}

export class PositionCloseSuccess implements Action {
  readonly type = POSITION_CLOSE_SUCCESS;
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

export class PositionPlaceSuccess implements Action {
  readonly type = POSITION_PLACE_SUCCESS;
}

export class PositionAdd implements Action {
  readonly type = POSITION_ADD;

  constructor(public payload: Position) {
  }
}

export class PositionsUpdateDetails {
  readonly type = POSITIONS_UPDATE_DETAILS;

  constructor(public payload: Tick) {
  }
}

export type Actions =
  LoadPositions
  | UpdatePositions
  | UpdatePosition
  | UpdateOrAddPosition
  | PositionsLoaded
  | PositionsNotLoaded
  | PositionClose
  | PositionDelete
  | PositionCloseSuccess
  | PositionPlace
  | PositionPlaceSuccess
  | PositionAdd
  | PositionsUpdateDetails;
