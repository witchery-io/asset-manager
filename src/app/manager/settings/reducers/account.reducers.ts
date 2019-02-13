import * as AccountActions from '@settings/actions/account.actions';

export interface State {
  isLoading: boolean;
  error: string | null;
  data: null;
}

export const initialState: State = {
  isLoading: false,
  error: null,
  data: null,
};

export function reducer(state: State = initialState, action: AccountActions.Actions): State {
  switch (action.type) {
    case AccountActions.LOAD_ACCOUNT: {
      return {...state, isLoading: true};
    }
    case AccountActions.ACCOUNT_LOADED: {
      return {...state, isLoading: false, error: null, data: action.payload.account};
    }
    case AccountActions.ACCOUNT_NOT_LOADED: {
      return {...state, error: action.payload.error, isLoading: false};
    }
    case AccountActions.CLEAN_UP_ACCOUNT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
