import * as fromOrders from '@settings/reducers/orders.reducers';
import * as fromPositions from '@settings/reducers/positions.reducers';
import * as fromBalance from '@settings/reducers/balance.reducers';
import { AppState } from '@app/core/intefaces/app-state.interface';

export interface SettingsState extends AppState {
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
