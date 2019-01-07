import * as fromOrders from '@trading/reducers/orders.reducers';
import * as fromPositions from '@trading/reducers/positions.reducers';
import * as fromBalance from '@trading/reducers/balance.reducers';
import * as fromSettings from '@trading/reducers/settings.reducers';
import { CoreState } from '@app/core/reducers';

/**
 * set trading`s states
 */
export interface TradingState extends CoreState {
  orders: fromOrders.State;
  positions: fromPositions.State;
  balance: fromBalance.State;
  settings: fromSettings.State;
}

export const reducers = {
  orders: fromOrders.reducer,
  positions: fromPositions.reducer,
  balance: fromBalance.reducer,
  settings: fromSettings.reducer,
};
