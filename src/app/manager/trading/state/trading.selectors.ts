import { createSelector } from '@ngrx/store';
import { AppTradingState, State } from '@trading/reducers';

/*
* Create TRADING selectors
* */
export const getTrading = (state: State) => state.trading;

export const getOrders = createSelector(getTrading, (state: AppTradingState) => state.orders);

export const getPositions = createSelector(getTrading, (state: AppTradingState) => state.positions);

export const getBalance = createSelector(getTrading, (state: AppTradingState) => state.balance);
