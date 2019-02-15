/*
* Core Selectors
* */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import * as fromOrders from '@settings/reducers/orders.reducers';
import * as fromPositions from '@settings/reducers/positions.reducers';
import * as fromBalance from '@settings/reducers/balance.reducers';

export const getCoreState = createFeatureSelector<SettingsState>('core');
export const getAccounts = createSelector(getCoreState, (state: SettingsState) => state.accounts);
export const getGroups = createSelector(getCoreState, (state: SettingsState) => state.groups);

/*
* Create SETTINGS selectors
* */

export const getSettingsState = createFeatureSelector<SettingsState>('settings');
export const getOrders = createSelector(getSettingsState, (state: SettingsState) => state.orders);
export const isLoadingOrders = createSelector(getOrders, (state: fromOrders.State) => state.isLoading);
export const getPositions = createSelector(getSettingsState, (state: SettingsState) => state.positions);
export const isLoadingPositions = createSelector(getPositions, (state: fromPositions.State) => state.isLoading);
export const getBalance = createSelector(getSettingsState, (state: SettingsState) => state.balance);
export const isLoadingBalance = createSelector(getBalance, (state: fromBalance.State) => state.isLoading);
export const getAccount = createSelector(getSettingsState, (state: SettingsState) => state.account.data);
export const getGroup = createSelector(getSettingsState, (state: SettingsState) => state.group.data);

/**
 * get Entities
 */
export const getBalanceFromSection = (section: fromBalance.State) => section.data;
