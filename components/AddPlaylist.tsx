/** @format */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import LabelAndTextInputField from './LabelAndTextInputField';
import { Styles } from '../styles/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlaylistData, RootStackParamList } from '../types';
import { setPlaylist } from '../redux/slices/savedPlaylistsSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'AddPlaylist'>;

function AddPlaylist({ navigation }: Props) {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistUrl, setplaylistUrl] = useState('');
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const dispatch = useAppDispatch();
  const existingPlaylistNames = useAppSelector((state) =>
    Object.keys(state.savedPlaylists).filter((name) => name !== '_persist')
  );

  const addPlayist = () => {
    setShowActivityIndicator(true);
    if (!isValidInputData()) {
      return;
    }
    storePlaylistAndMoveToExistingPlaylistsIfSuccessful();
  };

  const isValidInputData = () => {
    let isValidInputData = true;
    if (playlistName === '') {
      Alert.alert('Error', 'Please enter playist name!!!');
      isValidInputData = false;
    } else if (existingPlaylistNames.includes(playlistName.trim())) {
      Alert.alert(
        'Error',
        `Playlist with name ${playlistName.trim()} already exists. Please use a different name!!!`
      );
      isValidInputData = false;
    } else if (playlistUrl === '') {
      Alert.alert('Error', 'Please enter playlist url!!!');
      isValidInputData = false;
    }
    return isValidInputData;
  };

  const storePlaylistAndMoveToExistingPlaylistsIfSuccessful = async () => {
    try {
      const newPlaylist: PlaylistData = {
        url: playlistUrl.trim(),
        parsedData: null,
      };

      dispatch(
        setPlaylist({
          playlistName: playlistName.trim(),
          playlistData: newPlaylist,
        })
      );

      setShowActivityIndicator(false);
      navigation.navigate('HomeDrawer');
      if (Platform.OS === 'android') {
        ToastAndroid.show('Playlist successfully added!!!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Playlist successfully added!!!');
      }
    } catch (e) {
      console.log(e);
      setShowActivityIndicator(false);
      Alert.alert('Error', 'Failed to save playlist. Please try again!!!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        ...styles.container,
        ...Styles.globalStyles.primaryContainer,
      }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <View
        style={{
          ...styles.credentialsContainer,
          ...Styles.globalStyles.secondaryContainer,
        }}
      >
        <LabelAndTextInputField
          label="Playlist name"
          inputText={playlistName}
          setInputText={setPlaylistName}
          placeholder="Name your playlist..."
          textContentType="name"
          editable={!showActivityIndicator}
        />
        <LabelAndTextInputField
          label="M3U Playlist URL"
          inputText={playlistUrl}
          setInputText={setplaylistUrl}
          placeholder="Playlist URL..."
          textContentType="URL"
          editable={!showActivityIndicator}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={showActivityIndicator}
          style={{ ...styles.addButton }}
          onPress={() => addPlayist()}
        >
          <Text style={Styles.globalStyles.basicText}>Add</Text>
        </TouchableOpacity>
      </View>
      {showActivityIndicator ? (
        <ActivityIndicator
          size="large"
          style={{
            ...Styles.globalStyles.activityIndicator,
          }}
        />
      ) : (
        <></>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
  },
  credentialsContainer: {
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: 10,
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddPlaylist;
