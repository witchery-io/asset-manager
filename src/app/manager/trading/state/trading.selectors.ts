import { createSelector } from '@ngrx/store';
import { TradingState, State } from '@trading/reducers';

import { fromOrders, fromPositions, fromBalance } from '@trading/reducers';

/*
* Create TRADING selectors
* */
export const getTrading = (state: State) => state.trading;

export const getOrders = createSelector(getTrading, (state: TradingState) => state.orders);
export const getPositions = createSelector(getTrading, (state: TradingState) => state.positions);
export const getBalance = createSelector(getTrading, (state: TradingState) => state.balance);

/**
 *
 */
export const getOrdersFromSection = (section: fromOrders.State) => Object.values(section.entities);
export const getPositionsFromSection = (section: fromPositions.State) => Object.values(section.entities);
export const getBalanceFromSection = (section: fromBalance.State) => Object.values(section.data);
