/** @format */

import { configureStore } from '@reduxjs/toolkit';
import favoriteChannelsSlice from './slices/favoriteChannelsSlice';
import { PERSIST, REHYDRATE, persistStore } from 'redux-persist';
import recentChannelsSlice from './slices/recentChannelsSlice';
import savedPlaylistsSlice from './slices/savedPlaylistsSlice';

export const store = configureStore({
  reducer: {
    favoriteChannels: favoriteChannelsSlice,
    recentChannels: recentChannelsSlice,
    savedPlaylists: savedPlaylistsSlice,
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
