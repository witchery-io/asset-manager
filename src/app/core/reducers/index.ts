import { AppState } from '@app/core/intefaces/app-state.interface';
import * as fromAccount from './account.reducers';
import * as fromGroup from './group.reducers';
import * as fromTick from './tick.reducers';
import { createSelector } from '@ngrx/store';

export interface AppCoreState extends AppState {
  accounts: fromAccount.State;
  groups: fromGroup.State;
  ticks: fromTick.State;
}

export const reducers = {
  accounts: fromAccount.reducer,
  groups: fromGroup.reducer,
  ticks: fromTick.reducer,
};

export type State = AppState;

/*
* comment
* */
export const getApp = (state: State) => state.app;

export const getAccounts = createSelector(getApp, (state: AppCoreState) => state.accounts);

export const getGroups = createSelector(getApp, (state: AppCoreState) => state.groups);

export const getTicks = createSelector(getApp, (state: AppCoreState) => state.ticks);
