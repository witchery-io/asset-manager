import * as HistoriesActions from '@settings/actions/history.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { History } from '@app/shared/intefaces/history.interface';

export interface State extends EntityState<History> {
  isLoading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<History> = createEntityAdapter<History>();

export const initialState: State = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export function reducer(state: State = initialState, action: HistoriesActions.Actions): State {
  switch (action.type) {
    case HistoriesActions.LOAD_HISTORIES: {
      return {...state, isLoading: true};
    }
    case HistoriesActions.HISTORIES_LOADED: {
      return adapter.addAll(action.payload.histories, {...state, isLoading: false, error: null});
    }
    case HistoriesActions.HISTORIES_NOT_LOADED: {
      return {...state, error: action.payload.error, isLoading: false};
    }
    case HistoriesActions.HISTORY_ADD: {
      return adapter.addOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}
