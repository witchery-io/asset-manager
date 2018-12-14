import * as fromOrders from '@trading/reducers/orders.reducers';
import * as fromPositions from '@trading/reducers/positions.reducers';
import * as fromBalance from '@trading/reducers/balance.reducers';
import { AppState } from '@app/core/intefaces/app-state.interface';

export interface TradingState extends AppState {
  orders: fromOrders.State;
  positions: fromPositions.State;
  balance: fromBalance.State;
}

export const reducers = {
  orders: fromOrders.reducer,
  positions: fromPositions.reducer,
  balance: fromBalance.reducer,
};

export type State = AppState;
