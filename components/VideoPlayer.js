import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Video, VideoFullscreenUpdate, ResizeMode } from "expo-av";
import { StatusBar } from "expo-status-bar";

function VideoPlayer({ navigation, route }) {
  const video = useRef(null);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ActivityIndicator style={styles.activityMonitor} />
      <Video
        source={{
          uri:
            route.params.uri?.slice(route.params.uri.length - 2) === "ts"
              ? route.params.uri?.substring(0, route.params.uri?.length - 2) +
                "m3u8"
              : route.params.uri,
        }}
        ref={video}
        rate={1.0}
        volume={1.0}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        useNativeControls
        onLoad={() => video.current.presentFullscreenPlayer()}
        onError={() => {
          Alert.alert("Error", "Channel currently not available!!!");
          navigation.goBack();
        }}
        onFullscreenUpdate={(event) =>
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
