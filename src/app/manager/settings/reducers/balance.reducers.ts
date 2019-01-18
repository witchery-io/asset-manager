import * as BalanceActions from '@settings/actions/balance.actions';
import { Balance } from '@app/shared/intefaces/balance.interface';

export interface State {
  isLoading: boolean;
  error: string | null;
  data: Balance | null;
}

export const initialState: State = {
  isLoading: false,
  error: null,
  data: null,
};

export function reducer(state: State = initialState, action: BalanceActions.Actions): State {
  switch (action.type) {
    case BalanceActions.LOAD_BALANCE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case BalanceActions.BALANCE_LOADED: {
      return  {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload.balance,
      };
    }

    case BalanceActions.BALANCE_NOT_LOADED: {
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    }

    case BalanceActions.CLEAN_UP_BALANCE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
