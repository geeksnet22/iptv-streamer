/** @format */

import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExistingPlaylistItem from './ExistingPlaylistItem';
import { useIsFocused } from '@react-navigation/native';
import FloatingRoundButton from './FloatingRoundButton';
import { Styles } from '../styles/styles';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import RecentChannels from './RecentChannels';
import { useAppSelector } from '../hooks';

const ADD_LOGO_ADDRESS = '../assets/add-gb2bab072c_640.png';

type Props = NativeStackScreenProps<RootStackParamList, 'ExistingPlaylists'>;

const ExistingPlaylists = ({ navigation }: Props) => {
  const [playlists, setPlaylists] = React.useState<readonly KeyValuePair[]>(
    [] as readonly KeyValuePair[]
  );
  const isFocused = useIsFocused();
  const recentChannels = useAppSelector((state) => state.recentChannels.value);

  React.useEffect(() => {
    if (isFocused) {
      fetchAndSetExistingPlaylists();
    }
  }, [isFocused]);

  const fetchAndSetExistingPlaylists = async () => {
    try {
      await AsyncStorage.getAllKeys().then((keys) => {
        AsyncStorage.multiGet(keys).then((playlists) =>
          setPlaylists(
            playlists.filter((playlist) => !playlist[0]?.startsWith('persist:'))
          )
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
      style={{
        ...styles.container,
        ...Styles.globalStyles.primaryContainer,
      }}
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
      ) : (
        <></>
      )}
      {playlists.length === 0 ? (
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
        </>
      )}
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
