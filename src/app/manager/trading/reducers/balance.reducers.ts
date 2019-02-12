import * as BalanceActions from '@trading/actions/balance.actions';
import { Balance, getEmptyBalance } from '@app/shared/intefaces/balance.interface';

export interface State {
  isLoading: boolean;
  error: string | null;
  data: Balance;
}

export const initialState: State = {
  isLoading: false,
  error: null,
  data: getEmptyBalance(),
};

export function reducer(state: State = initialState, action: BalanceActions.Actions): State {
  switch (action.type) {
    case BalanceActions.LOAD_BALANCE: {
      return {...state, isLoading: true};
    }
    case BalanceActions.UPDATE_BALANCE: {
      return state;
    }
    case BalanceActions.UPDATE_BALANCE_ITEM: {
      return {...state, ...{data: action.payload}};
    }
    case BalanceActions.BALANCE_LOADED: {
      return {...state, isLoading: false, error: null, data: action.payload.balance};
    }
    case BalanceActions.BALANCE_NOT_LOADED: {
      return {...state, error: action.payload.error, isLoading: false};
    }
    default: {
      return state;
    }
  }
}
