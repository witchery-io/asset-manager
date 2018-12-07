import { Action } from '@ngrx/store';
import { Tick } from '@app/core/intefaces';

export const LOAD_TICKS = '[CORE] Load Ticks';
export const TICKS_LOADED = '[CORE] Ticks Loaded';
export const TICKS_NOT_LOADED = '[CORE] Ticks Not Loaded';


export class LoadTicks implements Action {
  readonly type = LOAD_TICKS;
}

export class TicksLoaded implements Action {
  readonly type = TICKS_LOADED;
  constructor(public payload: { ticks: Tick[] }) {}
}

export class TicksNotLoaded implements Action {
  readonly type = TICKS_NOT_LOADED;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  LoadTicks
  | TicksLoaded
  | TicksNotLoaded;
