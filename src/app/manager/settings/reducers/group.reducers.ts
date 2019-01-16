import * as GroupActions from '@settings/actions/group.actions';

export interface State {
  isLoading: boolean;
  error: string | null;
  data: null;
}

export const initialState: State = {
  isLoading: false,
  error: null,
  data: null,
};

export function reducer(state: State = initialState, action: GroupActions.Actions): State {
  switch (action.type) {
    case GroupActions.LOAD_GROUP: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case GroupActions.GROUP_LOADED: {
      return  {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload.group,
      };
    }

    case GroupActions.GROUP_NOT_LOADED: {
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
