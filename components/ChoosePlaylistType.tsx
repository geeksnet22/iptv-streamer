/** @format */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Styles } from '../styles/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ChoosePlaylistType'>;

const ChoosePlaylistType = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddPlaylistCredentials')}
      >
        <Text style={styles.buttonText}>Playlist Credentials</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddPlaylistURL')}
      >
        <Text style={styles.buttonText}>Playlist URL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.globalStyles.primaryContainer.backgroundColor,
  },
  button: {
    backgroundColor: Styles.globalStyles.secondaryContainer.backgroundColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: Styles.globalStyles.buttonText.color,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChoosePlaylistType;
