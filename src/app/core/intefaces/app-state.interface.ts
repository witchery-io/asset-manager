import { AppCoreState } from '@app/core/reducers';
import { TradingState } from '@trading/reducers';
import { SettingsState } from '@settings/reducers';

export interface AppState {
  app: AppCoreState;
  trading: TradingState;
  settings: SettingsState;
}
