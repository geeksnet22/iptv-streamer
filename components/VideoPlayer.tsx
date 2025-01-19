/** @format */

import * as React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Styles } from '../styles/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import PlayerView from '../modules/PlayerView';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;

const VideoPlayer = ({ route }: Props) => {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      ).catch((error) => console.log(error));
    }

    return () => PlayerView.stop();
  }, []);

  return (
    <View
      style={{
        ...Styles.globalStyles.primaryContainer,
      }}
    >
      <StatusBar hidden />
      <PlayerView.PlayerView
        style={styles.playerView}
        url={route.params.uri}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playerView: {
    width: '100%',
    height: '100%',
  },
});

export default VideoPlayer;
