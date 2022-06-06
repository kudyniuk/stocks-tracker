import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { accountSlice } from './accounts/accountsSlice';
import { subscribeUser } from './user/subscribeUser';
import { userSlice } from './user/user';

export const store = configureStore({
  reducer: {
    [accountSlice.name]: accountSlice.reducer,
    [userSlice.name]: userSlice.reducer
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
