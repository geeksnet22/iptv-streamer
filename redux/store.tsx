/** @format */

import { configureStore } from '@reduxjs/toolkit';
import favoriteChannelsSlice from './slices/favoriteChannelsSlice';

const store = configureStore({
  reducer: {
    favoriteChannels: favoriteChannelsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
