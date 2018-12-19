import { createSelector } from '@ngrx/store';
import { TradingState, State } from '@trading/reducers';
import * as fromOrders from '@trading/reducers/orders.reducers';
import * as fromPositions from '@trading/reducers/positions.reducers';
import * as fromBalance from '@trading/reducers/balance.reducers';

/*
* Create TRADING selectors
* */
export const getTrading = (state: State) => state.trading;
export const getOrders = createSelector(getTrading, (state: TradingState) => state.orders);
export const getPositions = createSelector(getTrading, (state: TradingState) => state.positions);
export const getBalance = createSelector(getTrading, (state: TradingState) => state.balance);

/**
 * get Entities
 */
export const getOrdersFromSection = (section: fromOrders.State) => Object.values(section.entities);
export const getPositionsFromSection = (section: fromPositions.State) => Object.values(section.entities);
export const getBalanceFromSection = (section: fromBalance.State) => section.data;
