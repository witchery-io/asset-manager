/*
* Core Selectors
* */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from '@settings/reducers';
import * as fromTick from '@app/core/reducers/tick.reducers';
import * as fromOrders from '@settings/reducers/orders.reducers';
import * as fromPositions from '@settings/reducers/positions.reducers';
import * as fromBalance from '@settings/reducers/balance.reducers';
import * as fromSettings from '@settings/reducers/settings.reducers';

export const getCoreState = createFeatureSelector<SettingsState>('core');
export const getAccounts = createSelector(getCoreState, (state: SettingsState) => state.accounts);
export const getGroups = createSelector(getCoreState, (state: SettingsState) => state.groups);
export const getTicks = createSelector(getCoreState, (state: SettingsState) => state.ticks);
export const ticksIsLoading = createSelector(getTicks, (state: fromTick.State) => state.isLoading);

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

export const getSettings = createSelector(getSettingsState, (state: SettingsState) => state.settings);
export const getId = createSelector(getSettings, (state: fromSettings.State) => state.tradingId);
export const getType = createSelector(getSettings, (state: fromSettings.State) => state.tradingType);


/**
 * get Entities
 */
export const getOrdersFromSection = (section: fromOrders.State) => Object.values(section.entities);
export const getPositionsFromSection = (section: fromPositions.State) => Object.values(section.entities);
export const getBalanceFromSection = (section: fromBalance.State) => section.data;
