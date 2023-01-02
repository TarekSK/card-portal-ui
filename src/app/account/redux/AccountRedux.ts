import { put, takeLatest } from 'redux-saga/effects';
import { ActionWithPayload } from '../../../common/interface/ActionWithPayload';
import { ServiceResponse } from '../../../common/interface/ServiceResponse';
import { AccountReadModel } from '../models/AccountReadModel';
import { AccountWriteModel } from '../models/AccountWriteModel';
import { getAllAccounts } from './AccountActions';

// Action Types
export const actionTypes = {
  AccountRequested: '[Request Account] Action',
  AccountLoaded: '[Loaded Account] API',
  AccountFailed: '[Failed Account] API',
  AccountSaved: '[Saved Account] Action',
};

// State
export interface IAccountState {
  account?: AccountReadModel[];
  loading: boolean;
  accountNotFound: boolean;
}

// Initial State Values
const initialAccountState: IAccountState = {
  account: undefined,
  loading: false,
  accountNotFound: false,
};

// Reducer
export const reducer = (
  state: IAccountState = initialAccountState,
  action: ActionWithPayload<IAccountState>,
): IAccountState => {
  switch (action.type) {
    // Requested
    case actionTypes.AccountRequested: {
      return { ...state, loading: true };
    }
    // Loaded
    case actionTypes.AccountLoaded: {
      return {
        ...state,
        account: action.payload?.account,
        loading: false,
        accountNotFound: false,
      };
    }
    // Failed
    case actionTypes.AccountFailed: {
      return {
        ...state,
        loading: false,
        accountNotFound: true,
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
  requestAccount: () => ({ type: actionTypes.AccountRequested }),
  fulfillAccount: (account: AccountReadModel[]) => ({
    type: actionTypes.AccountLoaded,
    payload: { account },
  }),
  fulfillFailedAccount: () => ({ type: actionTypes.AccountFailed }),
  fulfillAccountSaved: (account: AccountWriteModel) => ({
    type: actionTypes.AccountSaved,
    payload: { account },
  }),
};

// Saga
export function* saga() {
  function* contacttypeRequested(action: any) {
    const response: ServiceResponse<AccountReadModel[]> =
      yield getAllAccounts();
    // Check Response Status
    if (!response.errors.length) {
      yield put(actions.fulfillAccount(response.data!));
    } else {
      yield put(actions.fulfillFailedAccount());
    }
  }

  yield takeLatest(actionTypes.AccountRequested, contacttypeRequested);
  yield takeLatest(actionTypes.AccountSaved, contacttypeRequested);
}
