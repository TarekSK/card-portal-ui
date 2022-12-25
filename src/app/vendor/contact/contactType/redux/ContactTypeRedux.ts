import { put, takeLatest } from 'redux-saga/effects';
import { ActionWithPayload } from '../../../../../common/interface/ActionWithPayload';
import { ServiceResponse } from '../../../../../common/interface/ServiceResponse';
import { ContactTypeReadModel } from '../models/ContactTypeReadModel';
import { ContactTypeWriteModel } from '../models/ContactTypeWriteModel';
import { getAllContactTypes } from './ContactTypeActions';

// Action Types
export const actionTypes = {
  ContactTypeRequested: '[Request ContactType] Action',
  ContactTypeLoaded: '[Loaded ContactType] API',
  ContactTypeFailed: '[Failed ContactType] API',
  ContactTypeSaved: '[Saved ContactType] Action',
};

// State
export interface IContactTypeState {
  contactType?: ContactTypeReadModel[];
  loading: boolean;
  contactTypeNotFound: boolean;
}

// Initial State Values
const initialContactTypeState: IContactTypeState = {
  contactType: undefined,
  loading: false,
  contactTypeNotFound: false,
};

// Reducer
export const reducer = (
  state: IContactTypeState = initialContactTypeState,
  action: ActionWithPayload<IContactTypeState>,
): IContactTypeState => {
  switch (action.type) {
    // Requested
    case actionTypes.ContactTypeRequested: {
      return { ...state, loading: true };
    }
    // Loaded
    case actionTypes.ContactTypeLoaded: {
      return {
        ...state,
        contactType: action.payload?.contactType,
        loading: false,
        contactTypeNotFound: false,
      };
    }
    // Failed
    case actionTypes.ContactTypeFailed: {
      return {
        ...state,
        loading: false,
        contactTypeNotFound: true,
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
  requestContactType: () => ({ type: actionTypes.ContactTypeRequested }),
  fulfillContactType: (contactType: ContactTypeReadModel[]) => ({
    type: actionTypes.ContactTypeLoaded,
    payload: { contactType },
  }),
  fulfillFailedContactType: () => ({ type: actionTypes.ContactTypeFailed }),
  fulfillContactTypeSaved: (contactType: ContactTypeWriteModel) => ({
    type: actionTypes.ContactTypeSaved,
    payload: { contactType },
  }),
};

// Saga
export function* saga() {
  function* contacttypeRequested(action: any) {
    const response: ServiceResponse<ContactTypeReadModel[]> =
      yield getAllContactTypes();
    // Check Response Status
    if (!response.errors.length) {
      yield put(actions.fulfillContactType(response.data!));
    } else {
      yield put(actions.fulfillFailedContactType());
    }
  }

  yield takeLatest(actionTypes.ContactTypeRequested, contacttypeRequested);
  yield takeLatest(actionTypes.ContactTypeSaved, contacttypeRequested);
}
