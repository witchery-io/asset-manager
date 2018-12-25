import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import * as fromOrders from '@trading/reducers/orders.reducers';
import * as fromPositions from '@trading/reducers/positions.reducers';
import * as fromBalance from '@trading/reducers/balance.reducers';
import { Core, CoreState } from '@app/core/reducers';

/*
* Core Selectors
* */

export const getCoreState = createFeatureSelector<CoreState>('core');
export const getCore = createSelector(getCoreState, (state: CoreState) => state.core);
export const getAccounts = createSelector(getCore, (state: Core) => state.accounts);
export const getGroups = createSelector(getCore, (state: Core) => state.groups);
export const getTicks = createSelector(getCore, (state: Core) => state.ticks);

/*
* Create TRADING selectors
* */

export const getOrdersState = createFeatureSelector<TradingState>('orders');
export const getOrders = createSelector(getOrdersState, (state: TradingState) => state.orders);
export const isLoadingOrders = createSelector(getOrders, (state: fromOrders.State) => state.isLoading);

export const getPositionState = createFeatureSelector<TradingState>('positions');
export const getPositions = createSelector(getPositionState, (state: TradingState) => state.positions);
export const isLoadingPositions = createSelector(getPositions, (state: fromPositions.State) => state.isLoading);

export const getBalanceState = createFeatureSelector<TradingState>('balance');
export const getBalance = createSelector(getBalanceState, (state: TradingState) => state.balance);
export const isLoadingBalance = createSelector(getBalance, (state: fromBalance.State) => state.isLoading);

/**
 * get Entities
 */
export const getOrdersFromSection = (section: fromOrders.State) => Object.values(section.entities);
export const getPositionsFromSection = (section: fromPositions.State) => Object.values(section.entities);
export const getBalanceFromSection = (section: fromBalance.State) => section.data;
