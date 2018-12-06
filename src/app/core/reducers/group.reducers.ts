import * as GroupActions from '@app/core/actions/group.actions';
import { Group } from '@app/core/intefaces';

export interface State {
  isLoading: boolean;
  error: string;
  groups: Group[];
}

export const initialState: State = {
  isLoading: false,
  error: null,
  groups: null,
};

export function reducer(state: State = initialState, action: GroupActions.Actions): State {
  switch (action.type) {
    case GroupActions.LOAD_GROUPS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case GroupActions.GROUPS_LOADED: {
      return {
        ...state,
        error: null,
        isLoading: false,
        groups: action.payload.groups,
      };
    }

    case GroupActions.GROUPS_NOT_LOADED: {
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        groups: null,
      };
    }

    default: {
      return state;
    }
  }
}
