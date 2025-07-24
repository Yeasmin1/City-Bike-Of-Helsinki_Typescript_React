import { configureStore,ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bikeStationReducer from './slices/bikeStationSlice';
import uiReducer from './slices/uiSlice';
import mapReducer from './slices/mapSlice';
import contentReducer from './slices/contentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bikeStation: bikeStationReducer,
    ui: uiReducer,
    map: mapReducer,
    content: contentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk <ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>