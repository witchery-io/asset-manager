import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import * as fromOrders from '@trading/reducers/orders.reducers';
import * as fromPositions from '@trading/reducers/positions.reducers';
import * as fromBalance from '@trading/reducers/balance.reducers';
import * as fromTick from '@app/core/reducers/tick.reducers';
import * as fromSettings from '@trading/reducers/settings.reducers';

/*
* Core Selectors
* */

export const getCoreState = createFeatureSelector<TradingState>('core');
export const getAccounts = createSelector(getCoreState, (state: TradingState) => state.accounts);
export const getGroups = createSelector(getCoreState, (state: TradingState) => state.groups);
export const getTicks = createSelector(getCoreState, (state: TradingState) => state.ticks);
export const ticksIsLoading = createSelector(getTicks, (state: fromTick.State) => state.isLoading);

/*
* Create TRADING selectors
* */

export const getTradingState = createFeatureSelector<TradingState>('trading');
export const getOrders = createSelector(getTradingState, (state: TradingState) => state.orders);
export const isLoadingOrders = createSelector(getOrders, (state: fromOrders.State) => state.isLoading);
export const getPositions = createSelector(getTradingState, (state: TradingState) => state.positions);
export const isLoadingPositions = createSelector(getPositions, (state: fromPositions.State) => state.isLoading);
export const getBalance = createSelector(getTradingState, (state: TradingState) => state.balance);
export const isLoadingBalance = createSelector(getBalance, (state: fromBalance.State) => state.isLoading);

export const getSettings = createSelector(getTradingState, (state: TradingState) => state.settings);
export const getId = createSelector(getSettings, (state: fromSettings.State) => state.tradingId);
export const getType = createSelector(getSettings, (state: fromSettings.State) => state.tradingType);


/**
 * get Entities
 */
export const getOrdersFromSection = (section: fromOrders.State) => Object.values(section.entities);
export const getPositionsFromSection = (section: fromPositions.State) => Object.values(section.entities);
export const getBalanceFromSection = (section: fromBalance.State) => section.data;
