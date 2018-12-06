import * as fromAccount from './account.reducers';
import * as fromGroup from './group.reducers';

export const reducers = {
  accounts: fromAccount.reducer,
  groups: fromGroup.reducer,
};

export interface TradingState {
  accounts: fromAccount.State;
  groups: fromGroup.State;
}
