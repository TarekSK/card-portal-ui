import { put, takeLatest } from 'redux-saga/effects';
import { ActionWithPayload } from '../../../../../common/interface/ActionWithPayload';
import { ServiceResponse } from '../../../../../common/interface/ServiceResponse';
import { ContactReadModel } from '../models/ContactReadModel';
import { ContactWriteModel } from '../models/ContactWriteModel';
import { getVendorContacts } from './ContactActions';

// Action Types
export const actionTypes = {
  ContactRequested: '[Request Contact] Action',
  ContactLoaded: '[Loaded Contact] API',
  ContactFailed: '[Failed Contact] API',
  ContactSaved: '[Saved Contact] Action',
};

// State
export interface IContactState {
  contact?: ContactReadModel[];
  loading: boolean;
  contactNotFound: boolean;
}

// Initial State Values
const initialContactState: IContactState = {
  contact: undefined,
  loading: false,
  contactNotFound: false,
};

// Reducer
export const reducer = (
  state: IContactState = initialContactState,
  action: ActionWithPayload<IContactState>,
): IContactState => {
  switch (action.type) {
    // Requested
    case actionTypes.ContactRequested: {
      return { ...state, loading: true };
    }
    // Loaded
    case actionTypes.ContactLoaded: {
      return {
        ...state,
        contact: action.payload?.contact,
        loading: false,
        contactNotFound: false,
      };
    }
    // Failed
    case actionTypes.ContactFailed: {
      return {
        ...state,
        loading: false,
        contactNotFound: true,
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
  requestContact: () => ({ type: actionTypes.ContactRequested }),
  fulfillContact: (contact: ContactReadModel[]) => ({
    type: actionTypes.ContactLoaded,
    payload: { contact },
  }),
  fulfillFailedContact: () => ({ type: actionTypes.ContactFailed }),
  fulfillContactSaved: (contact: ContactWriteModel) => ({
    type: actionTypes.ContactSaved,
    payload: { contact },
  }),
};

// Saga
export function* saga() {
  function* contactRequested(action: any) {
    const response: ServiceResponse<ContactReadModel[]> =
      yield getVendorContacts(action.vendorId);
    // Check Response Status
    if (!response.errors.length) {
      yield put(actions.fulfillContact(response.data!));
    } else {
      yield put(actions.fulfillFailedContact());
    }
  }

  yield takeLatest(actionTypes.ContactRequested, contactRequested);
  yield takeLatest(actionTypes.ContactSaved, contactRequested);
}
