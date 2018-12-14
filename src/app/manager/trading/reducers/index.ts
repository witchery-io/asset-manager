import * as fromOrders from '@trading/reducers/orders.reducers';
import * as fromPositions from '@trading/reducers/positions.reducers';
import * as fromBalance from '@trading/reducers/balance.reducers';

export const reducers = {
  orders: fromOrders.reducer,
  positions: fromPositions.reducer,
  balance: fromBalance.reducer,
};
