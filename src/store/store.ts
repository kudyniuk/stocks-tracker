import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { accountSlice } from './accounts/accountsSlice';
import { subscribeUser } from './user/subscribeUser';
import { userSlice } from './user/user';
import { stocksSlice } from './stocks/stocksSlice';

export const store = configureStore({
  reducer: {
    [accountSlice.name]: accountSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [stocksSlice.name]: stocksSlice.reducer
  },
});

subscribeUser(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
