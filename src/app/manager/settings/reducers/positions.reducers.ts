import * as PositionsActions from '@settings/actions/positions.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Position } from '@app/shared/intefaces/position.interface';

export interface State extends EntityState<Position> {
  isLoading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Position> = createEntityAdapter<Position>();

export const initialState: State = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export function reducer(state: State = initialState, action: PositionsActions.Actions): State {
  switch (action.type) {
    case PositionsActions.LOAD_POSITIONS: {
      return {...state, isLoading: true};
    }
    case PositionsActions.UPDATE_POSITIONS: {
      return state;
    }
    case PositionsActions.UPDATE_POSITION_ITEMS: {

      // todo :: will changed

      // return adapter.updateMany(action.payload.positions.map(changes => ({id: changes.id, changes})), state);
      return adapter.addAll(action.payload.positions, {...state, isLoading: false, error: null});
    }
    case PositionsActions.POSITIONS_LOADED: {
      return adapter.addAll(action.payload.positions, {...state, isLoading: false, error: null});
    }
    case PositionsActions.POSITIONS_NOT_LOADED: {
      return {...state, error: action.payload.error, isLoading: false};
    }
    case PositionsActions.CLEAN_UP_POSITIONS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
