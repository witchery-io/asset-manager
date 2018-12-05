import * as AccountActions from '@app/core/actions/account.actions';
import { Account } from '@app/core/intefaces';

export interface State {
  isLoading: boolean;
  error: string;
  accounts: Account[];
}

export const initialState: State = {
  isLoading: false,
  error: null,
  accounts: null,
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
        accounts: action.payload,
      };
    }

    case AccountActions.ACCOUNTS_NOT_LOADED: {
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        accounts: null,
      };
    }
  }
}
