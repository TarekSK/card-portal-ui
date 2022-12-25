import { put, takeLatest } from 'redux-saga/effects';
import { ActionWithPayload } from '../../../../../common/interface/ActionWithPayload';
import { ServiceResponse } from '../../../../../common/interface/ServiceResponse';
import { CityReadModel } from '../models/CityReadModel';
import { CityWriteModel } from '../models/CityWriteModel';
import { getAllCities } from './CityActions';

// Action Types
export const actionTypes = {
  CityRequested: '[Request City] Action',
  CityLoaded: '[Loaded City] API',
  CityFailed: '[Failed City] API',
  CitySaved: '[Saved City] Action',
};

// State
export interface ICityState {
  city?: CityReadModel[];
  loading: boolean;
  cityNotFound: boolean;
}

// Initial State Values
const initialCityState: ICityState = {
  city: undefined,
  loading: false,
  cityNotFound: false,
};

// Reducer
export const reducer = (
  state: ICityState = initialCityState,
  action: ActionWithPayload<ICityState>,
): ICityState => {
  switch (action.type) {
    // Requested
    case actionTypes.CityRequested: {
      return { ...state, loading: true };
    }
    // Loaded
    case actionTypes.CityLoaded: {
      return {
        ...state,
        city: action.payload?.city,
        loading: false,
        cityNotFound: false,
      };
    }
    // Failed
    case actionTypes.CityFailed: {
      return {
        ...state,
        loading: false,
        cityNotFound: true,
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
  requestCity: () => ({ type: actionTypes.CityRequested }),
  fulfillCity: (city: CityReadModel[]) => ({
    type: actionTypes.CityLoaded,
    payload: { city },
  }),
  fulfillFailedCity: () => ({ type: actionTypes.CityFailed }),
  fulfillCitySaved: (city: CityWriteModel) => ({
    type: actionTypes.CitySaved,
    payload: { city },
  }),
};

// Saga
export function* saga() {
  function* cityRequested(action: any) {
    const response: ServiceResponse<CityReadModel[]> = yield getAllCities();
    // Check Response Status
    if (!response.errors.length) {
      yield put(actions.fulfillCity(response.data!));
    } else {
      yield put(actions.fulfillFailedCity());
    }
  }

  yield takeLatest(actionTypes.CityRequested, cityRequested);
  yield takeLatest(actionTypes.CitySaved, cityRequested);
}
