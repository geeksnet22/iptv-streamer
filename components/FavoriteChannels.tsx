/** @format */

import React, { useCallback, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { FlatList } from 'react-native-gesture-handler';
import ChannelListItem from './ChannelListItem';
import { PlaylistItem } from 'iptv-playlist-parser';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Styles } from '../styles/styles';
import { add } from '../redux/slices/recentChannelsSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'FavoriteChannels'>;

const FavoriteChannels = ({ navigation }: Props) => {
  const favoriteChannels = useAppSelector(
    (state) => state.favoriteChannels.value
  );
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (Platform.OS === 'android' && isFocused) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      ).catch((error) => console.log(error));
    }
  }, [isFocused]);

  const renderItem = useCallback(
    (playlistItem: PlaylistItem) => (
      <ChannelListItem
        playlistItem={playlistItem}
        favoriteChannels={favoriteChannels}
        onPress={() => {
          dispatch(add(playlistItem));
          navigation.navigate('VideoPlayer', { uri: playlistItem.url });
        }}
      />
    ),
    [favoriteChannels]
  );

  return (
    <SafeAreaView
      style={
        favoriteChannels.length > 0
          ? { ...Styles.globalStyles.primaryContainer }
          : {
              ...Styles.globalStyles.primaryContainer,
              justifyContent: 'center',
            }
      }
    >
      {favoriteChannels.length > 0 ? (
        <FlatList
          data={favoriteChannels}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) =>
            item.name + item.tvg.id + item.group.title + item.url
          }
        />
      ) : (
        <Text
          style={{
            ...Styles.globalStyles.basicText,
            ...styles.disclaimerText,
          }}
        >
          No channels added as favorites
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  disclaimerText: {
    alignSelf: 'center',
    fontStyle: 'italic',
    flexDirection: 'column',
  },
});

export default FavoriteChannels;
