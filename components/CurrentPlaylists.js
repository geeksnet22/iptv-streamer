import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlaylistItem from "./PlaylistItem";
import { useIsFocused } from "@react-navigation/native";

const ADD_LOGO_ADDRESS = "../assets/add-gb2bab072c_640.png";

function CurrentPlaylists({ navigation, route }) {
  const [playlists, setPlaylists] = useState([]);
  const isFocused = useIsFocused();

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

  useEffect(() => {
    if (isFocused) {
      fetchAndSetCurrentPlaylists();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {playlists.map((playlist) => (
        <PlaylistItem
          key={playlist[0]}
          playlistName={playlist[0]}
          playlistURL={playlist[1]}
          navigation={navigation}
          route={route}
        />
      ))}
      <TouchableOpacity
        style={styles.addPlaylist}
        onPress={() =>
          navigation.navigate("AddPlaylist", {
            existingPlaylistNames: playlists.map((playlist) => playlist[0]),
          })
        }
      >
        <Image style={styles.addLogo} source={require(ADD_LOGO_ADDRESS)} />
        <Text style={styles.addText}>Add playlist</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  addPlaylist: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 10,
    backgroundColor: "#403B3B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  addLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "stretch",
  },
  addText: {
    color: "white",
    fontSize: 20,
  },
});

export default CurrentPlaylists;
