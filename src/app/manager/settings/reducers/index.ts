import * as fromOrders from '@settings/reducers/orders.reducers';
import * as fromPositions from '@settings/reducers/positions.reducers';
import * as fromBalance from '@settings/reducers/balance.reducers';
import { CoreState } from '@app/core/reducers';

export interface SettingsState extends CoreState {
  orders: fromOrders.State;
  positions: fromPositions.State;
  balance: fromBalance.State;
}

export const reducers = {
  orders: fromOrders.reducer,
  positions: fromPositions.reducer,
  balance: fromBalance.reducer,
};
