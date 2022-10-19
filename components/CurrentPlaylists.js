import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlaylistItem from "./PlaylistItem";
import { useIsFocused } from "@react-navigation/native";
import FloatingRoundButton from "./FloatingRoundButton";

const ADD_LOGO_ADDRESS = "../assets/add-gb2bab072c_640.png";

function CurrentPlaylists({ navigation, route }) {
  const [playlists, setPlaylists] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchAndSetCurrentPlaylists();
    }
  }, [isFocused]);

  const fetchAndSetCurrentPlaylists = async () => {
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
    navigation.navigate("AddPlaylist", {
      existingPlaylistNames: playlists.map((playlist) => playlist[0]),
    });
  return (
    <View style={styles.container}>
      {playlists.map((playlist) => (
        <PlaylistItem
          key={playlist[0]}
          playlistName={playlist[0]}
          playlistURL={playlist[1]}
          navigation={navigation}
          route={route}
          fetchAndSetCurrentPlaylists={fetchAndSetCurrentPlaylists}
        />
      ))}
      <FloatingRoundButton
        style={styles.floatingButton}
        icon={require(ADD_LOGO_ADDRESS)}
        onPress={buttonOnPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  floatingButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 20,
  },
});

export default CurrentPlaylists;
