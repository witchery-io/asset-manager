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
    case PositionsActions.POSITIONS_LOADED: {
      return adapter.addAll(action.payload.positions, {...state, isLoading: false, error: null});
    }
    case PositionsActions.POSITIONS_NOT_LOADED: {
      return {...state, error: action.payload.error, isLoading: false};
    }
    case PositionsActions.CLEAN_UP_POSITIONS: {
      return initialState;
    }
    case PositionsActions.POSITIONS_UPDATE: {
      return adapter.updateMany(action.payload.positions.map(changes => ({id: changes.id, changes})), state);
    }
    case PositionsActions.POSITION_UPDATE: {
      return adapter.updateOne({id: action.payload.id, changes: action.payload}, state);
    }
    case PositionsActions.POSITION_DELETE: {
      return adapter.removeOne(action.payload, state);
    }
    case PositionsActions.POSITION_ADD: {
      return adapter.addOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}
