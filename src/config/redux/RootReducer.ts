import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import * as city from '../../app/vendor/address/city/redux/CityRedux';
import * as area from '../../app/vendor/address/area/redux/AreaRedux';
import * as contactType from '../../app/vendor/contact/contactType/redux/ContactTypeRedux';
import * as user from '../../app/user/redux/UserRedux';

// Root Reducer
export const RootReducer = combineReducers({
  city: city.reducer,
  area: area.reducer,
  contactType: contactType.reducer,
  user: user.reducer,
});

// Root State
export type RootState = ReturnType<typeof RootReducer>;

// Root Saga
export function* rootSaga() {
  yield all([city.saga(), area.saga(), contactType.saga(), user.saga()]);
}
