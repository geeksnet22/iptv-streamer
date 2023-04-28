/** @format */

import * as React from 'react';
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
      p.url == playlistItem.url
  );

const ChannelListItem = ({
  playlistItem,
  favoriteChannels,
  onPress,
}: Props) => {
  const dispatch = useAppDispatch();
  const [isFavorited, setIsFavorited] = React.useState(
    getIndexOfPlaylistInFavorites(playlistItem, favoriteChannels) !== -1
  );

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...Styles.globalStyles.secondaryContainer }}
      onPress={onPress}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', maxWidth: '90%' }}
      >
        {playlistItem.tvg.logo ? (
          <Image
            style={styles.icon}
            source={{ uri: playlistItem.tvg.logo }}
          />
        ) : (
          <></>
        )}
        <Text style={Styles.globalStyles.headerText}>{playlistItem.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setIsFavorited(!isFavorited);
          const index = getIndexOfPlaylistInFavorites(
            playlistItem,
            favoriteChannels
          );
          dispatch(index === -1 ? add(playlistItem) : remove(index));
        }}
      >
        <Image
          style={{
            height: 25,
            width: 25,
          }}
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
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
});

export default ChannelListItem;
