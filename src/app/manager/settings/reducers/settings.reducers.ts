import * as fromSettings from '@settings/actions/settings.actions';

export interface Settings {
  tradingId: string;
  tradingType: string;
  groupByPair: boolean;
}

export type State = Settings;

export const initialState: State = null;

export function reducer(state: State = initialState, action: fromSettings.Actions): State {
  switch (action.type) {
    case fromSettings.SETTINGS_SET:
      return action.payload;
    case fromSettings.SETTINGS_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
