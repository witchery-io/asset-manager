import { Action } from '@ngrx/store';
import { Tick } from '@app/core/intefaces';

export const LOAD_TICKS = '[CORE] Load Ticks';
export const UPDATE_TICKS = '[CORE] Update Ticks';
export const UPDATE_TICK = '[CORE] Update Tick';
export const UPDATE_TICKS_ITEMS = '[CORE] Update Ticks Items';
export const TICKS_LOADED = '[CORE] Ticks Loaded';
export const TICKS_NOT_LOADED = '[CORE] Ticks Not Loaded';


export class LoadTicks implements Action {
  readonly type = LOAD_TICKS;
}

export class UpdateTicks implements Action {
  readonly type = UPDATE_TICKS;
}

export class UpdateTick implements Action {
  readonly type = UPDATE_TICK;

  constructor(public payload: { tick: any }) { // todo : Tick
  }
}

export class UpdateTicksItems implements Action {
  readonly type = UPDATE_TICKS_ITEMS;

  constructor(public payload: { ticks: Tick[] }) {
  }
}

export class TicksLoaded implements Action {
  readonly type = TICKS_LOADED;

  constructor(public payload: { ticks: Tick[] }) {
  }
}

export class TicksNotLoaded implements Action {
  readonly type = TICKS_NOT_LOADED;

  constructor(public payload: { error: string }) {
  }
}

export type Actions =
  LoadTicks
  | UpdateTicks
  | UpdateTick
  | UpdateTicksItems
  | TicksLoaded
  | TicksNotLoaded;
