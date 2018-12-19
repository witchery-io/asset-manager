import * as fromOrders from '@trading/reducers/orders.reducers';
import * as fromPositions from '@trading/reducers/positions.reducers';
import * as fromBalance from '@trading/reducers/balance.reducers';
import { AppState } from '@app/core/intefaces/app-state.interface';

/*
* Order State
* */
export interface OrdersState {
  orders: fromOrders.State;
}

/*
* Position State
* */
export interface PositionsState {
  orders: fromPositions.State;
}

/*
* Balance State
* */
export interface BalanceState {
  orders: fromOrders.State;
}

/**
 * set trading`s states
 */
export interface TradingState extends AppState {
  orders: OrdersState;
  positions: PositionsState;
  balance: BalanceState;
}

export const reducers = {
  orders: fromOrders.reducer,
  positions: fromPositions.reducer,
  balance: fromBalance.reducer,
};

export type State = AppState;
