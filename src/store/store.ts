import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bannersReducer from '../redux/bannerSlice';

export const store = configureStore({
  reducer: {
    bannersState: bannersReducer,
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
