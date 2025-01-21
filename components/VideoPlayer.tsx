/** @format */

import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Styles } from '../styles/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import PlayerView from '../modules/PlayerView';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;

const lockOrientation = async () => {
  try {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  } catch (error) {
    console.error('Failed to lock orientation:', error);
  }
};

const handleOrientationChange = async () => {
  try {
    const orientation = await ScreenOrientation.getOrientationAsync();
    if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    } else if (orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    }
  } catch (error) {
    console.error('Failed to handle orientation change:', error);
  }
};

const VideoPlayer = ({ route }: Props) => {
  useEffect(() => {
    lockOrientation();
    StatusBar.setHidden(true);
    const subscription = ScreenOrientation.addOrientationChangeListener(
      handleOrientationChange
    );

    return () => {
      PlayerView.stop();
      ScreenOrientation.removeOrientationChangeListener(subscription);
      StatusBar.setHidden(false);
    };
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
