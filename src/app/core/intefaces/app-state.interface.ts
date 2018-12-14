import { AppCoreState } from '@app/core/reducers';
import { AppTradingState } from '@trading/reducers';

export interface AppState {
  app: AppCoreState;
  trading: AppTradingState;
}
