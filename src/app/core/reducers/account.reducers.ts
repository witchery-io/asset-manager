import * as AccountActions from '../actions/account.actions';
import { Account } from '../intefaces';

export interface State {
  isLoading: boolean;
  error: string;
  users: Account[];
}

export const initialState: State = {
  isLoading: false,
  error: null,
  users: null,
};

export function reducer(state: State = initialState, action: AccountActions.Actions): State {
  switch (action.type) {
    case AccountActions.LOAD_ACCOUNTS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case AccountActions.ACCOUNTS_LOADED: {
      return {
        ...state,
        error: null,
        isLoading: false,
        users: action.payload,
      };
    }

    case AccountActions.ACCOUNTS_NOT_LOADED: {
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        users: null,
      };
    }
  }
}
