import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { currenciesSlice } from './slices/currencySlice';

const rootReducer = combineReducers({
  currenciesReducer: currenciesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: __IS_DEV__,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
