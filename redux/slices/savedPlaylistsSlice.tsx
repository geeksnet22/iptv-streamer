/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { savedPlaylistsPersistConfig } from '../../persistConfig';
import { PlaylistData } from '../../types';

interface SavedPlaylistsState {
  [key: string]: PlaylistData;
}

const initialState: SavedPlaylistsState = {};

const savedPlaylistsSlice = createSlice({
  name: 'savedPlaylists',
  initialState,
  reducers: {
    setPlaylist: (
      state,
      action: PayloadAction<{
        playlistName: string;
        playlistData: PlaylistData;
      }>
    ) => {
      const { playlistName, playlistData } = action.payload;
      state[playlistName] = playlistData;
    },
    removePlaylist: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { setPlaylist, removePlaylist } = savedPlaylistsSlice.actions;

export default persistReducer(
  savedPlaylistsPersistConfig,
  savedPlaylistsSlice.reducer
);
