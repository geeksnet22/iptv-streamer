/** @format */

import { configureStore } from '@reduxjs/toolkit';
import favoriteChannelsSlice from './slices/favoriteChannelsSlice';
import { PERSIST, REHYDRATE, persistStore } from 'redux-persist';
import recentChannelsSlice from './slices/recentChannelsSlice';

export const store = configureStore({
  reducer: {
    favoriteChannels: favoriteChannelsSlice,
    recentChannels: recentChannelsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
