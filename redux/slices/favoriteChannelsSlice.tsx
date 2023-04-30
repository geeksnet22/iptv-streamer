/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PlaylistItem } from 'iptv-playlist-parser';
import { persistReducer } from 'redux-persist';
import { favoriteChannelsPersistConfig } from '../../persistConfig';

interface FavoriteChannelsState {
  value: PlaylistItem[];
}

const initialState: FavoriteChannelsState = {
  value: [],
};

const favoriteChannelsSlice = createSlice({
  name: 'FavoriteChannels',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<PlaylistItem>) => {
      state.value = [...new Set(state.value.concat(action.payload))];
    },
    remove: (state, action: PayloadAction<number>) => {
      state.value = [
        ...state.value.slice(0, action.payload),
        ...state.value.slice(action.payload + 1),
      ];
    },
  },
});

export const { add, remove } = favoriteChannelsSlice.actions;

export default persistReducer(
  favoriteChannelsPersistConfig,
  favoriteChannelsSlice.reducer
);
