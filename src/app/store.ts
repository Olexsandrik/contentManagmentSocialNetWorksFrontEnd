import listenerMiddleware from '../middleware/auth';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import user from './features/userSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware);
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
