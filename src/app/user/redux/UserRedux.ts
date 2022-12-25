import { put, takeLatest } from 'redux-saga/effects';
import { ActionWithPayload } from '../../../common/interface/ActionWithPayload';
import { ServiceResponse } from '../../../common/interface/ServiceResponse';
import { UserReadModel } from '../models/UserReadModel';
import { UserWriteModel } from '../models/UserWriteModel';
import { getAllUsers } from './UserActions';

// Action Types
export const actionTypes = {
  UserRequested: '[Request User] Action',
  UserLoaded: '[Loaded User] API',
  UserFailed: '[Failed User] API',
  UserSaved: '[Saved User] Action',
};

// State
export interface IUserState {
  user?: UserReadModel[];
  loading: boolean;
  userNotFound: boolean;
}

// Initial State Values
const initialUserState: IUserState = {
  user: undefined,
  loading: false,
  userNotFound: false,
};

// Reducer
export const reducer = (
  state: IUserState = initialUserState,
  action: ActionWithPayload<IUserState>,
): IUserState => {
  switch (action.type) {
    // Requested
    case actionTypes.UserRequested: {
      return { ...state, loading: true };
    }
    // Loaded
    case actionTypes.UserLoaded: {
      return {
        ...state,
        user: action.payload?.user,
        loading: false,
        userNotFound: false,
      };
    }
    // Failed
    case actionTypes.UserFailed: {
      return {
        ...state,
        loading: false,
        userNotFound: true,
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Actions
export const actions = {
  requestUser: () => ({ type: actionTypes.UserRequested }),
  fulfillUser: (user: UserReadModel[]) => ({
    type: actionTypes.UserLoaded,
    payload: { user },
  }),
  fulfillFailedUser: () => ({ type: actionTypes.UserFailed }),
  fulfillUserSaved: (user: UserWriteModel) => ({
    type: actionTypes.UserSaved,
    payload: { user },
  }),
};

// Saga
export function* saga() {
  function* userRequested(action: any) {
    const response: ServiceResponse<UserReadModel[]> = yield getAllUsers();
    // Check Response Status
    if (!response.errors.length) {
      yield put(actions.fulfillUser(response.data!));
    } else {
      yield put(actions.fulfillFailedUser());
    }
  }

  yield takeLatest(actionTypes.UserRequested, userRequested);
  yield takeLatest(actionTypes.UserSaved, userRequested);
}
