import { reduxBatch } from '@manaflair/redux-batch';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { RootReducer, rootSaga } from './RootReducer';

// Middleware - Init
const sagaMiddleware = createSagaMiddleware();

// Configure Store
const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefultMiddleware) =>
    getDefultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
