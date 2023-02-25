/** @format */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExistingPlaylistItem from './ExistingPlaylistItem';
import { useIsFocused } from '@react-navigation/native';
import FloatingRoundButton from './FloatingRoundButton';
import { Styles } from '../styles/Styles';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const ADD_LOGO_ADDRESS = '../assets/add-gb2bab072c_640.png';

type Props = NativeStackScreenProps<RootStackParamList, 'ExistingPlaylists'>;

const ExistingPlaylists = ({ navigation }: Props) => {
  const [playlists, setPlaylists] = useState<readonly KeyValuePair[]>(
    [] as readonly KeyValuePair[]
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchAndSetExistingPlaylists();
    }
  }, [isFocused]);

  const fetchAndSetExistingPlaylists = async () => {
    try {
      await AsyncStorage.getAllKeys().then((keys) => {
        AsyncStorage.multiGet(keys).then((playlists) =>
          setPlaylists(playlists)
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  const buttonOnPress = () =>
    navigation.navigate('AddPlaylist', {
      existingPlaylistNames: playlists.map((playlist) => playlist[0]),
    });

  type ItemProps = {
    playlistName: string;
    playlistUrl: string | null;
  };

  const renderItem = ({ playlistName, playlistUrl }: ItemProps) => (
    <ExistingPlaylistItem
      playlistName={playlistName}
      playlistURL={playlistUrl}
      fetchAndSetExistingPlaylists={fetchAndSetExistingPlaylists}
      navigation={navigation}
    />
  );

  return (
    <View
      style={
        playlists.length === 0
          ? {
              ...styles.container,
              ...Styles.globalStyles.primaryContainer,
              justifyContent: 'center',
            }
          : {
              ...styles.container,
              ...Styles.globalStyles.primaryContainer,
            }
      }
    >
      {playlists.length === 0 ? (
        <Text
          style={{
            ...Styles.globalStyles.basicText,
            alignSelf: 'center',
            fontStyle: 'italic',
            flexDirection: 'column',
          }}
        >
          Please add a playlist
        </Text>
      ) : null}
      <View style={styles.playlistWrapper}>
        <FlatList
          data={playlists.map((playlist) => ({
            playlistName: playlist[0],
            playlistUrl: playlist[1],
          }))}
          renderItem={({ item }) =>
            renderItem({
              playlistName: item.playlistName,
              playlistUrl: item.playlistUrl,
            })
          }
          keyExtractor={(item) => item.playlistName}
        />
      </View>

      <FloatingRoundButton
        style={styles.floatingButton}
        icon={require(ADD_LOGO_ADDRESS)}
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
  },
  floatingButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
});

export default ExistingPlaylists;
