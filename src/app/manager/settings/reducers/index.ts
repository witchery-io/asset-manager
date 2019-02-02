import * as fromOrders from '@settings/reducers/orders.reducers';
import * as fromPositions from '@settings/reducers/positions.reducers';
import * as fromBalance from '@settings/reducers/balance.reducers';
import * as fromAccount from '@settings/reducers/account.reducers';
import * as fromGroup from '@settings/reducers/group.reducers';
import { CoreState } from '@app/core/reducers';

export interface SettingsState extends CoreState {
  orders: fromOrders.State;
  positions: fromPositions.State;
  balance: fromBalance.State;
  account: fromAccount.State;
  group: fromGroup.State;
}

export const reducers = {
  orders: fromOrders.reducer,
  positions: fromPositions.reducer,
  balance: fromBalance.reducer,
  account: fromAccount.reducer,
  group: fromGroup.reducer,
};
