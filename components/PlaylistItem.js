import React from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import GroupsList from "./GroupsList";

function PlaylistItem({ navigation, route, playlistName, playlistURL }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("GroupsList", {
          playlistName: playlistName,
          playlistURL: playlistURL,
        })
      }
    >
      <Text style={styles.playlistNameText}>{playlistName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#403B3B",
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 10,
    width: "70%",
    maxWidth: 300,
  },
  playlistNameText: {
    color: "white",
    fontSize: 20,
  },
});

export default PlaylistItem;
