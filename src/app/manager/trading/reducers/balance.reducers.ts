import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as BalanceActions from '@trading/actions/balance.actions';
import { Balance } from '@app/shared/intefaces/balance.interface';

export interface State extends EntityState<Balance> {
  isLoading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Balance> = createEntityAdapter<Balance>();

export const initialState: State = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export function reducer(state: State = initialState, action: BalanceActions.Actions): State {
  switch (action.type) {
    case BalanceActions.LOAD_BALANCE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case BalanceActions.BALANCE_LOADED: {
      return adapter.addMany(action.payload.balance, {
        ...state,
        isLoading: false,
        error: '',
      });
    }

    case BalanceActions.BALANCE_NOT_LOADED: {
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
