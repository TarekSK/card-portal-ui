import { put, takeLatest } from 'redux-saga/effects';
import { ActionWithPayload } from '../../../common/interface/ActionWithPayload';
import { ServiceResponse } from '../../../common/interface/ServiceResponse';
import { CardReadModel } from '../models/CardReadModel';
import { CardWriteModel } from '../models/CardWriteModel';
import { getAllCards } from './CardActions';

// Action Types
export const actionTypes = {
  CardRequested: '[Request Card] Action',
  CardLoaded: '[Loaded Card] API',
  CardFailed: '[Failed Card] API',
  CardSaved: '[Saved Card] Action',
};

// State
export interface ICardState {
  card?: CardReadModel[];
  loading: boolean;
  cardNotFound: boolean;
}

// Initial State Values
const initialCardState: ICardState = {
  card: undefined,
  loading: false,
  cardNotFound: false,
};

// Reducer
export const reducer = (
  state: ICardState = initialCardState,
  action: ActionWithPayload<ICardState>,
): ICardState => {
  switch (action.type) {
    // Requested
    case actionTypes.CardRequested: {
      return { ...state, loading: true };
    }
    // Loaded
    case actionTypes.CardLoaded: {
      return {
        ...state,
        card: action.payload?.card,
        loading: false,
        cardNotFound: false,
      };
    }
    // Failed
    case actionTypes.CardFailed: {
      return {
        ...state,
        loading: false,
        cardNotFound: true,
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
  requestCard: () => ({ type: actionTypes.CardRequested }),
  fulfillCard: (card: CardReadModel[]) => ({
    type: actionTypes.CardLoaded,
    payload: { card },
  }),
  fulfillFailedCard: () => ({ type: actionTypes.CardFailed }),
  fulfillCardSaved: (card: CardWriteModel) => ({
    type: actionTypes.CardSaved,
    payload: { card },
  }),
};

// Saga
export function* saga() {
  function* contacttypeRequested(action: any) {
    const response: ServiceResponse<CardReadModel[]> = yield getAllCards();
    // Check Response Status
    if (!response.errors.length) {
      yield put(actions.fulfillCard(response.data!));
    } else {
      yield put(actions.fulfillFailedCard());
    }
  }

  yield takeLatest(actionTypes.CardRequested, contacttypeRequested);
  yield takeLatest(actionTypes.CardSaved, contacttypeRequested);
}
