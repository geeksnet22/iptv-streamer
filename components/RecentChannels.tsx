/** @format */

import React, { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, Platform, SafeAreaView, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { PlaylistItem } from 'iptv-playlist-parser';
import { add } from '../redux/slices/recentChannelsSlice';
import RecentChannelsItem from './RecentChannelsItem';
import { useNavigation } from '@react-navigation/native';

type Props = {
  recentChannels: PlaylistItem[];
};

const RecentChannels = ({ recentChannels }: Props) => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android' && isFocused) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      ).catch((error) => console.log(error));
    }
  }, [isFocused]);

  const renderItem = useCallback(
    (playlistItem: PlaylistItem) => (
      <RecentChannelsItem
        playlistItem={playlistItem}
        onPress={() => {
          dispatch(add(playlistItem));
          navigation.navigate('VideoPlayer', { uri: playlistItem.url });
        }}
      />
    ),
    [recentChannels]
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        data={recentChannels.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (p) =>
                p.name === value.name &&
                p.tvg.id === value.tvg.id &&
                p.group.title === value.group.title
            )
        )}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) =>
          item.name + item.tvg.id + item.group.title + item.url
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
});

export default RecentChannels;
