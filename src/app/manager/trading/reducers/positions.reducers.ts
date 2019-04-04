import * as PositionsActions from '@trading/actions/positions.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Position } from '@app/shared/intefaces/position.interface';
import * as dotProp from 'dot-prop-immutable';

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
      return adapter.updateMany(action.payload.positions.map(changes => ({id: changes.id, changes})), state);
    }
    case PositionsActions.UPDATE_POSITION: {
      return adapter.updateOne({id: action.payload.id, changes: action.payload}, state);
    }
    case PositionsActions.POSITIONS_LOADED: {
      return adapter.addAll(action.payload.positions, {...state, isLoading: false, error: null});
    }
    case PositionsActions.POSITIONS_NOT_LOADED: {
      return {...state, error: action.payload.error, isLoading: false};
    }
    case PositionsActions.POSITION_DELETE: {
      return adapter.removeOne(action.payload, state);
    }
    case PositionsActions.SUB_POSITION_DELETE: {
      const subId = action.payload;
      const positions = Object.values(state.entities);

      /*
      * TODO: will be changed
      * */
      for (let i = 0; i < positions.length; i++) {
        for (let j = 0; j < positions[i].subPositions.length; j++) {
          if (positions[i].subPositions[j].id === subId) {
            return dotProp.delete(state, `entities.${positions[i].id}.subPositions.${j}`);
          }
        }
      }

      return state;
    }
    case PositionsActions.POSITION_ADD: {
      return adapter.addOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}
