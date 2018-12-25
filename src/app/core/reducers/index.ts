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
* Core Selectors
* */
export const getApp = (state: State) => state.app;
export const getAccounts = createSelector(getApp, (state: AppCoreState) => state.accounts);
export const getGroups = createSelector(getApp, (state: AppCoreState) => state.groups);
export const getTicks = createSelector(getApp, (state: AppCoreState) => state.ticks);
export const ticksIsLoading = createSelector(getTicks, (state: fromTick.State) => state.isLoading);

/**
 * Get Entities
 */
export const getAccountsFromSection = (section: fromAccount.State) => Object.values(section.entities);
export const getGroupsFromSection = (section: fromGroup.State) => Object.values(section.entities);
export const getTicksFromSection = (section: fromTick.State) => Object.values(section.entities);
