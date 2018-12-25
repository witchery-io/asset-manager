import * as AccountActions from '@app/core/actions/account.actions';
import { Account } from '@app/core/intefaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<Account> {
  isLoading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Account> = createEntityAdapter<Account>();

export const initialState: State = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export function reducer(state: State = initialState, action: AccountActions.Actions): State {
  switch (action.type) {
    case AccountActions.LOAD_ACCOUNTS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case AccountActions.ACCOUNTS_LOADED: {
      return adapter.addMany(action.payload.accounts, {
        ...state,
        isLoading: false,
        error: null,
      });
    }

    case AccountActions.ACCOUNTS_NOT_LOADED: {
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
}
