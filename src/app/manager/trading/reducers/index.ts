import * as fromOrders from '@trading/reducers/orders.reducers';
import * as fromPositions from '@trading/reducers/positions.reducers';
import * as fromBalance from '@trading/reducers/balance.reducers';

export { fromOrders, fromPositions, fromBalance };

import { AppState } from '@app/core/intefaces/app-state.interface';

/*
* Order State
* */
export interface OrderState {
  orders: fromOrders.State;
}

/*
* Position State
* */
export interface PositionState {
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
  orders: OrderState;
  positions: PositionState;
  balance: BalanceState;
}

export const reducers = {
  orders: fromOrders.reducer,
  positions: fromPositions.reducer,
  balance: fromBalance.reducer,
};

export type State = AppState;
