import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import * as account from '../../app/account/redux/AccountRedux';
import * as card from '../../app/card/redux/CardRedux';
import * as transaction from '../../app/transaction/redux/TransactionRedux';
import * as user from '../../app/user/redux/UserRedux';
import * as contact from '../../app/vendor/contact/contact/redux/ContactRedux';
import * as contactType from '../../app/vendor/contact/contactType/redux/ContactTypeRedux';
import * as address from '../../app/vendor/address/address/redux/AddressRedux';
import * as city from '../../app/vendor/address/city/redux/CityRedux';
import * as area from '../../app/vendor/address/area/redux/AreaRedux';
import * as vendor from '../../app/vendor/vendor/redux/VendorRedux';

// Root Reducer
export const RootReducer = combineReducers({
  account: account.reducer,
  card: card.reducer,
  transaction: transaction.reducer,
  user: user.reducer,
  contact: contact.reducer,
  contactType: contactType.reducer,
  address: address.reducer,
  city: city.reducer,
  area: area.reducer,
  vendor: vendor.reducer,
});

// Root State
export type RootState = ReturnType<typeof RootReducer>;

// Root Saga
export function* rootSaga() {
  yield all([
    account.saga(),
    card.saga(),
    transaction.saga(),
    user.saga(),
    contact.saga(),
    contactType.saga(),
    address.saga(),
    city.saga(),
    area.saga(),
    vendor.saga(),
  ]);
}
