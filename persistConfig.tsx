/** @format */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const favoriteChannelsPersistConfig = {
  key: 'favoriteChannels',
  storage: AsyncStorage,
};

export const recentChannelsPersistConfig = {
  key: 'recentChannels',
  storage: AsyncStorage,
};
