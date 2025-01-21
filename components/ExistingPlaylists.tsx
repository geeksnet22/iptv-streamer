/** @format */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExistingPlaylistItem from './ExistingPlaylistItem';
import { useIsFocused } from '@react-navigation/native';
import FloatingRoundButton from './FloatingRoundButton';
import { Styles } from '../styles/styles';
import { PlaylistData } from '../types'; // Import the PlaylistData type
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import RecentChannels from './RecentChannels';
import { useAppSelector } from '../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'ExistingPlaylists'>;

const ExistingPlaylists = ({ navigation }: Props) => {
  const [playlists, setPlaylists] = useState<{ [key: string]: PlaylistData }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const recentChannels = useAppSelector((state) => state.recentChannels.value);

  useEffect(() => {
    if (isFocused) {
      fetchAndSetExistingPlaylists();
    }
  }, [isFocused]);

  const fetchAndSetExistingPlaylists = async () => {
    try {
      const storedPlaylists = await AsyncStorage.getItem('savedPlaylists');
      if (storedPlaylists) {
        const parsedPlaylists = JSON.parse(storedPlaylists);
        setPlaylists(parsedPlaylists);
      }
    } catch (e) {
      console.error('Failed to fetch playlists:', e);
      Alert.alert('Error', 'Failed to fetch playlists. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonOnPress = () =>
    navigation.navigate('AddPlaylist', {
      existingPlaylistNames: Object.keys(playlists),
    });

  const renderItem = useCallback(
    ({
      item: { playlistName, playlistUrl },
    }: {
      item: { playlistName: string; playlistUrl: string };
    }) => (
      <ExistingPlaylistItem
        playlistName={playlistName}
        playlistUrl={playlistUrl}
        fetchAndSetExistingPlaylists={fetchAndSetExistingPlaylists}
        navigation={navigation}
      />
    ),
    [fetchAndSetExistingPlaylists, navigation]
  );

  const data = useMemo(
    () =>
      Object.keys(playlists).map((playlistName) => ({
        playlistName,
        playlistUrl: playlists[playlistName].url,
      })),
    [playlists]
  );

  return (
    <View
      style={{ ...styles.container, ...Styles.globalStyles.primaryContainer }}
    >
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />
      ) : data.length === 0 ? (
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
          {recentChannels.length > 0 && (
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
          )}
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
