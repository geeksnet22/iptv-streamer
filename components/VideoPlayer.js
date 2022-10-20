import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { Video, VideoFullscreenUpdate, ResizeMode } from "expo-av";
import { StatusBar } from "expo-status-bar";

function VideoPlayer({ navigation, route }) {
  const video = useRef(null);

  const replaceFileTypeTsWithM3u8 = (originalUrl) =>
    originalUrl?.slice(originalUrl.length - 2) === "ts"
      ? originalUrl?.substring(0, originalUrl?.length - 2) + "m3u8"
      : originalUrl;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ActivityIndicator style={styles.activityMonitor} />
      <Video
        source={{
          uri: replaceFileTypeTsWithM3u8(route.params.uri),
          overrideFileExtensionAndroid: "m3u8",
        }}
        ref={video}
        rate={1.0}
        volume={1.0}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        useNativeControls
        onLoad={() =>
          Platform.OS === "ios" ? video.current.presentFullscreenPlayer() : {}
        }
        onError={(error) => {
          Alert.alert("Error", "Channel currently not available!!!");
          navigation.goBack();
        }}
        onFullscreenUpdate={(event) =>
          Platform.OS === "ios" &&
          event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS
            ? navigation.goBack()
            : () => {}
        }
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  activityMonitor: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  video: {
    flex: 1,
  },
});

export default VideoPlayer;
