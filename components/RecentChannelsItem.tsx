/** @format */

import * as React from 'react';
import { PlaylistItem } from 'iptv-playlist-parser';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Styles } from '../styles/styles';

type Props = {
  playlistItem: PlaylistItem;
  onPress: () => void;
};

const RecentChannelsItem = ({ playlistItem, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={{ ...Styles.globalStyles.secondaryContainer, ...styles.container }}
      onPress={onPress}
    >
      <Image
        style={styles.logo}
        source={{ uri: playlistItem.tvg.logo }}
      />
      <Text
        numberOfLines={1}
        style={{
          ...Styles.globalStyles.basicText,
          ...styles.channelName,
        }}
      >
        {playlistItem.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 150,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  logo: {
    height: 20,
    width: '100%',
    resizeMode: 'contain',
  },
  channelName: {
    fontSize: 12,
    padding: 5,
    position: 'absolute',
    bottom: 0,
  },
});

export default RecentChannelsItem;
