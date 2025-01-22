/** @format */

import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppSelector } from '../hooks';
import ExistingPlaylistItem from './ExistingPlaylistItem';
import FloatingRoundButton from './FloatingRoundButton';
import { Styles } from '../styles/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import RecentChannels from './RecentChannels';

type Props = NativeStackScreenProps<RootStackParamList, 'ExistingPlaylists'>;

const ExistingPlaylists = ({ navigation }: Props) => {
  const recentChannels = useAppSelector((state) => state.recentChannels.value);
  const playlists = useAppSelector((state) => state.savedPlaylists);

  const buttonOnPress = () => navigation.navigate('AddPlaylist');

  const renderItem = ({
    item,
  }: {
    item: { playlistName: string; playlistUrl: string };
  }) => (
    <ExistingPlaylistItem
      playlistName={item.playlistName}
      playlistUrl={item.playlistUrl}
      navigation={navigation}
    />
  );

  const data = useMemo(
    () =>
      Object.keys(playlists)
        .filter((name) => name !== '_persist')
        .map((playlistName) => ({
          playlistName,
          playlistUrl: playlists[playlistName].url,
        })),
    [playlists]
  );

  return (
    <View
      style={{ ...styles.container, ...Styles.globalStyles.primaryContainer }}
    >
      {recentChannels.length > 0 ? (
        <View>
          <Text
            style={{
              ...Styles.globalStyles.headerText,
              ...Styles.globalStyles.secondaryContainer,
              ...styles.header,
            }}
          >
            Recently Played
          </Text>
          <RecentChannels recentChannels={recentChannels} />
        </View>
      ) : null}
      {data.length === 0 ? (
        <Text
          style={{
            ...Styles.globalStyles.basicText,
            alignSelf: 'center',
            fontStyle: 'italic',
            position: 'absolute',
            top: '50%',
          }}
        >
          Please add a playlist
        </Text>
      ) : (
        <>
          <Text
            style={{
              ...Styles.globalStyles.headerText,
              ...Styles.globalStyles.secondaryContainer,
              ...styles.header,
            }}
          >
            Local Playlists
          </Text>
          <View style={styles.playlistWrapper}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.playlistName}
            />
          </View>
        </>
      )}
      <FloatingRoundButton
        style={styles.floatingButton}
        icon={require('../assets/add-gb2bab072c_640.png')}
        onPress={buttonOnPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
  },
  playlistWrapper: {
    margin: 5,
    maxWidth: 600,
    marginBottom: 20,
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  header: {
    marginTop: 10,
    padding: 5,
  },
});

export default ExistingPlaylists;
