/** @format */

import React from 'react';
import { Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Styles } from '../styles/styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAppDispatch } from '../hooks';
import { removePlaylist } from '../redux/slices/savedPlaylistsSlice';

const REMOVE_LOGO_LOCATION = '../assets/icons8-remove-48.png';

type Props = {
  playlistName: string;
  playlistUrl: string;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ExistingPlaylists',
    undefined
  >;
};

const ExistingPlaylistItem = ({
  playlistName,
  playlistUrl,
  navigation,
}: Props) => {
  const dispatch = useAppDispatch();

  const removePlaylistHandler = () => {
    try {
      dispatch(removePlaylist(playlistName));
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Not able to remove, please try again!!!');
    }
  };

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...Styles.globalStyles.secondaryContainer }}
      onPress={() =>
        navigation.navigate('GroupList', {
          playlistName: playlistName,
          playlistUrl: playlistUrl,
        })
      }
    >
      <Text style={Styles.globalStyles.basicText}>{playlistName}</Text>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Remove playlist?',
            'Are you sure you want to remove this playlist?',
            [
              {
                text: 'Yes',
                onPress: removePlaylistHandler,
              },
              { text: 'No' },
            ]
          );
        }}
      >
        <Image
          style={styles.deleteLogo}
          source={require(REMOVE_LOGO_LOCATION)}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomColor: 'white',
    borderWidth: 1,
  },
  deleteLogo: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});

export default ExistingPlaylistItem;
