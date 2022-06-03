import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { accountSlice } from './accounts/accountsSlice';

export const store = configureStore({
  reducer: {
    [accountSlice.name]: accountSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
