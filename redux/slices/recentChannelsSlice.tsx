/** @format */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PlaylistItem } from 'iptv-playlist-parser';
import persistReducer from 'redux-persist/es/persistReducer';
import { recentChannelsPersistConfig } from '../../persistConfig';

interface RecentChannelsState {
  value: PlaylistItem[];
}

const initialState: RecentChannelsState = {
  value: [],
};

export const recentChannelsSlice = createSlice({
  name: 'RecentChannels',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<PlaylistItem>) => {
      state.value = [action.payload, ...state.value];
    },
  },
});

export const { add } = recentChannelsSlice.actions;

export default persistReducer(
  recentChannelsPersistConfig,
  recentChannelsSlice.reducer
);
