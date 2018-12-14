import { AppCoreState } from '@app/core/reducers';
import { AppTradingState } from '@trading/reducers';
import { AppSettingsState } from '@settings/reducers';

export interface AppState {
  app: AppCoreState;
  trading: AppTradingState;
  settings: AppSettingsState;
}
