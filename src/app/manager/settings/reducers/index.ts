import * as fromOrders from '@settings/reducers/orders.reducers';
import * as fromPositions from '@settings/reducers/positions.reducers';
import * as fromBalance from '@settings/reducers/balance.reducers';
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

export interface SettingsState extends AppState {
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
