import * as fromSettings from '@trading/actions/settings.actions';

export interface Settings {
  id: string;
  type: string;
  groupByPair: boolean;
}

export type State = Settings;

export const initialState: State = {
  id: null,
  type: null,
  groupByPair: true,
};

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
