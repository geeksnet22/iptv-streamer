/** @format */

import React, { useCallback, useMemo } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Styles } from '../styles/styles';
import { PlaylistItem } from 'iptv-playlist-parser';
import { useAppDispatch } from '../hooks';
import { add, remove } from '../redux/slices/favoriteChannelsSlice';

type Props = {
  playlistItem: PlaylistItem;
  favoriteChannels: PlaylistItem[];
  onPress: () => void;
};

const getIndexOfPlaylistInFavorites = (
  playlistItem: PlaylistItem,
  favoriteChannels: PlaylistItem[]
): number =>
  favoriteChannels.findIndex(
    (p) =>
      p.name === playlistItem.name &&
      p.group.title === playlistItem.group.title &&
      p.tvg.id === playlistItem.tvg.id
  );

const ChannelListItem = ({
  playlistItem,
  favoriteChannels,
  onPress,
}: Props) => {
  const dispatch = useAppDispatch();

  const isFavorited = useMemo(
    () => getIndexOfPlaylistInFavorites(playlistItem, favoriteChannels) !== -1,
    [playlistItem, favoriteChannels]
  );

  const handleFavoritePress = useCallback(() => {
    const index = getIndexOfPlaylistInFavorites(playlistItem, favoriteChannels);
    dispatch(index === -1 ? add(playlistItem) : remove(index));
  }, [dispatch, playlistItem, favoriteChannels]);

  return (
    <TouchableOpacity
      style={[styles.container, Styles.globalStyles.secondaryContainer]}
      onPress={onPress}
    >
      <View style={styles.row}>
        <Image
          style={styles.icon}
          source={
            playlistItem.tvg.logo !== ''
              ? { uri: playlistItem.tvg.logo }
              : require('../assets/icons8-tv-50.png')
          }
        />
        <Text style={Styles.globalStyles.headerText}>{playlistItem.name}</Text>
      </View>
      <TouchableOpacity onPress={handleFavoritePress}>
        <Image
          style={styles.favoriteIcon}
          source={
            isFavorited
              ? require('../assets/icons8-favorite-red.png')
              : require('../assets/icons8-favorite-white.png')
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'white',
    borderWidth: 1,
    minHeight: 75,
    borderBottomLeftRadius: 10,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '90%',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  favoriteIcon: {
    height: 25,
    width: 25,
  },
});

export default ChannelListItem;
