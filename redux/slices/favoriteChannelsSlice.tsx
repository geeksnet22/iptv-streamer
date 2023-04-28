/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { PlaylistItem } from 'iptv-playlist-parser';

interface FavoriteChannelsState {
  value: PlaylistItem[];
}

const initialState: FavoriteChannelsState = {
  value: [],
};

export const favoriteChannelsSlice = createSlice({
  name: 'FavoriteChannels',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<PlaylistItem[]>) => {
      state.value = action.payload;
    },
    unset: (state) => {
      state.value = [];
    },
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
export const favoriteChannels = (state: RootState) => state.favoriteChannels;
export default favoriteChannelsSlice.reducer;
