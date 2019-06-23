import * as PositionsActions from '@trading/actions/positions.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Position } from '@app/shared/intefaces/position.interface';
import { getPositionsFromSection } from '@trading/state/trading.selectors';

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
    case PositionsActions.UPDATE_OR_ADD_POSITION: {
      if (typeof state.entities[action.payload.id] === 'undefined') {
        return adapter.addOne(action.payload, state);
      } else {
        return adapter.updateOne({id: action.payload.id, changes: action.payload}, state);
      }
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
    case PositionsActions.POSITION_ADD: {
      return adapter.addOne(action.payload, state);
    }
    case PositionsActions.POSITIONS_UPDATE_DETAILS: {
      const positions = getPositionsFromSection(state).map((position): Position => {
        if (action.payload.pair !== position.pair) {
          return position;
        }

        const subPositions = position.subPositions.map((subPosition) => {
          return {
            ...subPosition,
            ...{ask: action.payload.ask, bid: action.payload.bid},
          };
        });

        return {
          ...position,
          ...{subPositions: subPositions},
          ...{ask: action.payload.ask, bid: action.payload.bid},
        };
      });

      return adapter.updateMany((positions as Position[]).map(changes => ({id: changes.id, changes})), state);
    }
    default: {
      return state;
    }
  }
}
