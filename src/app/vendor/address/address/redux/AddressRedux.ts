import { put, takeLatest } from 'redux-saga/effects';
import { ActionWithPayload } from '../../../../../common/interface/ActionWithPayload';
import { ServiceResponse } from '../../../../../common/interface/ServiceResponse';
import { AddressReadModel } from '../models/AddressReadModel';
import { AddressWriteModel } from '../models/AddressWriteModel';
import { getVendorAddresses } from './AddressActions';

// Action Types
export const actionTypes = {
  AddressRequested: '[Request Address] Action',
  AddressLoaded: '[Loaded Address] API',
  AddressFailed: '[Failed Address] API',
  AddressSaved: '[Saved Address] Action',
};

// State
export interface IAddressState {
  address?: AddressReadModel[];
  loading: boolean;
  addressNotFound: boolean;
}

// Initial State Values
const initialAddressState: IAddressState = {
  address: undefined,
  loading: false,
  addressNotFound: false,
};

// Reducer
export const reducer = (
  state: IAddressState = initialAddressState,
  action: ActionWithPayload<IAddressState>,
): IAddressState => {
  switch (action.type) {
    // Requested
    case actionTypes.AddressRequested: {
      return { ...state, loading: true };
    }
    // Loaded
    case actionTypes.AddressLoaded: {
      return {
        ...state,
        address: action.payload?.address,
        loading: false,
        addressNotFound: false,
      };
    }
    // Failed
    case actionTypes.AddressFailed: {
      return {
        ...state,
        loading: false,
        addressNotFound: true,
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
  requestAddress: () => ({
    type: actionTypes.AddressRequested,
  }),
  fulfillAddress: (address: AddressReadModel[]) => ({
    type: actionTypes.AddressLoaded,
    payload: { address },
  }),
  fulfillFailedAddress: () => ({ type: actionTypes.AddressFailed }),
  fulfillAddressSaved: (address: AddressWriteModel) => ({
    type: actionTypes.AddressSaved,
    payload: { address },
  }),
};

// Saga
export function* saga() {
  function* addressRequested(action: any) {
    const response: ServiceResponse<AddressReadModel[]> =
      yield getVendorAddresses(action.vendorId);
    // Check Response Status
    if (!response.errors.length) {
      yield put(actions.fulfillAddress(response.data!));
    } else {
      yield put(actions.fulfillFailedAddress());
    }
  }

  yield takeLatest(actionTypes.AddressRequested, addressRequested);
  yield takeLatest(actionTypes.AddressSaved, addressRequested);
}
