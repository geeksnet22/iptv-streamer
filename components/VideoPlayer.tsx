/** @format */

import * as React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import { Video, VideoFullscreenUpdate, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Styles } from '../styles/Styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;

const VideoPlayer = ({ route, navigation }: Props) => {
  const video = React.useRef<Video>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      ).catch((error) => console.log(error));
    }
  }, []);

  const replaceFileTypeTsWithM3u8 = (originalUrl: string): string =>
    originalUrl?.slice(originalUrl.length - 2) === 'ts'
      ? originalUrl?.substring(0, originalUrl?.length - 2) + 'm3u8'
      : originalUrl;

  return (
    <View
      style={{
        ...Styles.globalStyles.primaryContainer,
      }}
    >
      <StatusBar hidden />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={Styles.globalStyles.activityIndicator}
        />
      ) : (
        <></>
      )}
      <Video
        source={{
          uri: replaceFileTypeTsWithM3u8(route.params.uri),
        }}
        ref={video}
        rate={1.0}
        volume={1.0}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        useNativeControls
        onLoad={() => {
          setIsLoading(false);
          Platform.OS === 'ios' && video.current
            ? video.current.presentFullscreenPlayer()
            : {};
        }}
        onError={(error) => {
          console.log(error);
          setIsLoading(false);
          Alert.alert('Error', 'Channel currently not available!!!');
          navigation.goBack();
        }}
        onFullscreenUpdate={(event) =>
          Platform.OS === 'ios' &&
          event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS
            ? navigation.goBack()
            : {}
        }
        style={styles.video}
        collapsable={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
  },
});

export default VideoPlayer;
