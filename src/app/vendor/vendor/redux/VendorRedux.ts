import { put, takeLatest } from 'redux-saga/effects';
import { ActionWithPayload } from '../../../../common/interface/ActionWithPayload';
import { ServiceResponse } from '../../../../common/interface/ServiceResponse';
import { VendorReadModel } from '../models/VendorReadModel';
import { VendorWriteModel } from '../models/VendorWriteModel';
import { getAllVendors } from './VendorActions';

// Action Types
export const actionTypes = {
  VendorRequested: '[Request Vendor] Action',
  VendorLoaded: '[Loaded Vendor] API',
  VendorFailed: '[Failed Vendor] API',
  VendorSaved: '[Saved Vendor] Action',
};

// State
export interface IVendorState {
  vendor?: VendorReadModel[];
  loading: boolean;
  vendorNotFound: boolean;
}

// Initial State Values
const initialVendorState: IVendorState = {
  vendor: undefined,
  loading: false,
  vendorNotFound: false,
};

// Reducer
export const reducer = (
  state: IVendorState = initialVendorState,
  action: ActionWithPayload<IVendorState>,
): IVendorState => {
  switch (action.type) {
    // Requested
    case actionTypes.VendorRequested: {
      return { ...state, loading: true };
    }
    // Loaded
    case actionTypes.VendorLoaded: {
      return {
        ...state,
        vendor: action.payload?.vendor,
        loading: false,
        vendorNotFound: false,
      };
    }
    // Failed
    case actionTypes.VendorFailed: {
      return {
        ...state,
        loading: false,
        vendorNotFound: true,
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
  requestVendor: () => ({ type: actionTypes.VendorRequested }),
  fulfillVendor: (vendor: VendorReadModel[]) => ({
    type: actionTypes.VendorLoaded,
    payload: { vendor },
  }),
  fulfillFailedVendor: () => ({ type: actionTypes.VendorFailed }),
  fulfillVendorSaved: (vendor: VendorWriteModel) => ({
    type: actionTypes.VendorSaved,
    payload: { vendor },
  }),
};

// Saga
export function* saga() {
  function* vendorRequested(action: any) {
    const response: ServiceResponse<VendorReadModel[]> =
      yield getAllVendors();
    // Check Response Status
    if (!response.errors.length) {
      yield put(actions.fulfillVendor(response.data!));
    } else {
      yield put(actions.fulfillFailedVendor());
    }
  }

  yield takeLatest(actionTypes.VendorRequested, vendorRequested);
  yield takeLatest(actionTypes.VendorSaved, vendorRequested);
}
