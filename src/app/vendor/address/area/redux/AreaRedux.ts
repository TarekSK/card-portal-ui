import { put, takeLatest } from 'redux-saga/effects';
import { ActionWithPayload } from '../../../../../common/interface/ActionWithPayload';
import { ServiceResponse } from '../../../../../common/interface/ServiceResponse';
import { AreaReadModel } from '../models/AreaReadModel';
import { AreaWriteModel } from '../models/AreaWriteModel';
import { getAllAreas } from './AreaActions';

// Action Types
export const actionTypes = {
  AreaRequested: '[Request Area] Action',
  AreaLoaded: '[Loaded Area] API',
  AreaFailed: '[Failed Area] API',
  AreaSaved: '[Saved Area] Action',
};

// State
export interface IAreaState {
  area?: AreaReadModel[];
  loading: boolean;
  areaNotFound: boolean;
}

// Initial State Values
const initialAreaState: IAreaState = {
  area: undefined,
  loading: false,
  areaNotFound: false,
};

// Reducer
export const reducer = (
  state: IAreaState = initialAreaState,
  action: ActionWithPayload<IAreaState>,
): IAreaState => {
  switch (action.type) {
    // Requested
    case actionTypes.AreaRequested: {
      return { ...state, loading: true };
    }
    // Loaded
    case actionTypes.AreaLoaded: {
      return {
        ...state,
        area: action.payload?.area,
        loading: false,
        areaNotFound: false,
      };
    }
    // Failed
    case actionTypes.AreaFailed: {
      return {
        ...state,
        loading: false,
        areaNotFound: true,
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
  requestArea: () => ({ type: actionTypes.AreaRequested }),
  fulfillArea: (area: AreaReadModel[]) => ({
    type: actionTypes.AreaLoaded,
    payload: { area },
  }),
  fulfillFailedArea: () => ({ type: actionTypes.AreaFailed }),
  fulfillAreaSaved: (area: AreaWriteModel) => ({
    type: actionTypes.AreaSaved,
    payload: { area },
  }),
};

// Saga
export function* saga() {
  function* areaRequested(action: any) {
    const response: ServiceResponse<AreaReadModel[]> = yield getAllAreas();
    // Check Response Status
    if (!response.errors.length) {
      yield put(actions.fulfillArea(response.data!));
    } else {
      yield put(actions.fulfillFailedArea());
    }
  }

  yield takeLatest(actionTypes.AreaRequested, areaRequested);
  yield takeLatest(actionTypes.AreaSaved, areaRequested);
}
