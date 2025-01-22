/** @format */

import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import ChannelListItem from './ChannelListItem';
import { Styles } from '../styles/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { PlaylistItem } from 'iptv-playlist-parser';
import { useAppDispatch, useAppSelector } from '../hooks';
import { add } from '../redux/slices/recentChannelsSlice';
import useMemoizedFilter from '../hooks/useMemoizedFilter';

type Props = NativeStackScreenProps<RootStackParamList, 'ChannelList'>;

const All_CHANNELS_GROUP_NAME = 'All Channels';

const ChannelList = ({ route, navigation }: Props) => {
  const [searchText, setSearchText] = useState('');

  const favoriteChannels = useAppSelector(
    (state) => state.favoriteChannels.value
  );
  const dispatch = useAppDispatch();
  const channels = useAppSelector((state) => {
    const playlist = state.savedPlaylists[route.params.playlistName];
    if (!playlist) return [];
    return route.params.groupTitle === All_CHANNELS_GROUP_NAME
      ? playlist.parsedData.items
      : playlist.parsedData.items.filter(
          (item) => item.group.title === route.params.groupTitle
        );
  });

  const filteredChannels = useMemoizedFilter(channels, searchText, 'name');

  const renderItem = useCallback(
    ({ item }: { item: PlaylistItem }) => (
      <ChannelListItem
        playlistItem={item}
        favoriteChannels={favoriteChannels}
        onPress={() => {
          dispatch(add(item));
          navigation.navigate('VideoPlayer', { uri: item.url });
        }}
      />
    ),
    [favoriteChannels, dispatch, navigation]
  );

  return (
    <SafeAreaView style={Styles.globalStyles.primaryContainer}>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <View style={styles.itemListContainer}>
        <FlatList
          data={filteredChannels}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemListContainer: {
    margin: 5,
    maxWidth: 600,
    marginBottom: 30,
  },
});

export default ChannelList;
