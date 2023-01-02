import { put, takeLatest } from 'redux-saga/effects';
import { ActionWithPayload } from '../../../common/interface/ActionWithPayload';
import { ServiceResponse } from '../../../common/interface/ServiceResponse';
import { TransactionReadModel } from '../models/TransactionReadModel';
import { TransactionWriteModel } from '../models/TransactionWriteModel';
import { getAllTransactions } from './TransactionActions';

// Action Types
export const actionTypes = {
  TransactionRequested: '[Request Transaction] Action',
  TransactionLoaded: '[Loaded Transaction] API',
  TransactionFailed: '[Failed Transaction] API',
  TransactionSaved: '[Saved Transaction] Action',
};

// State
export interface ITransactionState {
  transaction?: TransactionReadModel[];
  loading: boolean;
  transactionNotFound: boolean;
}

// Initial State Values
const initialTransactionState: ITransactionState = {
  transaction: undefined,
  loading: false,
  transactionNotFound: false,
};

// Reducer
export const reducer = (
  state: ITransactionState = initialTransactionState,
  action: ActionWithPayload<ITransactionState>,
): ITransactionState => {
  switch (action.type) {
    // Requested
    case actionTypes.TransactionRequested: {
      return { ...state, loading: true };
    }
    // Loaded
    case actionTypes.TransactionLoaded: {
      return {
        ...state,
        transaction: action.payload?.transaction,
        loading: false,
        transactionNotFound: false,
      };
    }
    // Failed
    case actionTypes.TransactionFailed: {
      return {
        ...state,
        loading: false,
        transactionNotFound: true,
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
  requestTransaction: () => ({ type: actionTypes.TransactionRequested }),
  fulfillTransaction: (transaction: TransactionReadModel[]) => ({
    type: actionTypes.TransactionLoaded,
    payload: { transaction },
  }),
  fulfillFailedTransaction: () => ({ type: actionTypes.TransactionFailed }),
  fulfillTransactionSaved: (transaction: TransactionWriteModel) => ({
    type: actionTypes.TransactionSaved,
    payload: { transaction },
  }),
};

// Saga
export function* saga() {
  function* contacttypeRequested(action: any) {
    const response: ServiceResponse<TransactionReadModel[]> =
      yield getAllTransactions();
    // Check Response Status
    if (!response.errors.length) {
      yield put(actions.fulfillTransaction(response.data!));
    } else {
      yield put(actions.fulfillFailedTransaction());
    }
  }

  yield takeLatest(actionTypes.TransactionRequested, contacttypeRequested);
  yield takeLatest(actionTypes.TransactionSaved, contacttypeRequested);
}
