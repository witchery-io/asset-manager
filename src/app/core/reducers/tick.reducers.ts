import * as TickActions from '@app/core/actions/tick.actions';
import { Tick } from '@app/core/intefaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<Tick> {
  isLoading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Tick> = createEntityAdapter<Tick>({
  selectId: (model: Tick) => model.pair,
});

export const initialState: State = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export function reducer(state: State = initialState, action: TickActions.Actions): State {
  switch (action.type) {
    case TickActions.LOAD_TICKS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case TickActions.TICKS_LOADED: {
      return adapter.addMany(action.payload.ticks, {
        ...state,
        isLoading: false,
        error: '',
      });
    }

    case TickActions.TICKS_NOT_LOADED: {
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
