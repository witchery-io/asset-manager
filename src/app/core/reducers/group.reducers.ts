import * as GroupActions from '@app/core/actions/group.actions';
import { Group } from '@app/core/intefaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<Group> {
  isLoading: boolean;
  error: string;
}

export const adapter: EntityAdapter<Group> = createEntityAdapter<Group>();

export const initialState: State = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export function reducer(state: State = initialState, action: GroupActions.Actions): State {
  switch (action.type) {
    case GroupActions.LOAD_GROUPS: {
      return {...state, isLoading: true};
    }
    case GroupActions.ADD_GROUP: {
      return adapter.addOne(action.payload, state);
    }
    case GroupActions.UPDATE_GROUP: {
      return adapter.updateOne({id: action.payload.id, changes: action.payload}, state);
    }
    case GroupActions.GROUPS_LOADED: {
      return adapter.addAll(action.payload.groups, {...state, isLoading: false, error: null});
    }
    case GroupActions.GROUPS_NOT_LOADED: {
      return {...state, error: action.payload.error, isLoading: false};
    }
    default: {
      return state;
    }
  }
}
