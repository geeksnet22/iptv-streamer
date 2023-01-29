import React from "react";
import { Text, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "./styles/Styles";

const REMOVE_LOGO_LOCATION = "../assets/icons8-remove-48.png";

function PlaylistItem({
  navigation,
  route,
  playlistName,
  playlistUrl,
  fetchAndSetCurrentPlaylists,
}) {
  const removePlaylist = async () => {
    try {
      await AsyncStorage.removeItem(playlistName).then((response) =>
        fetchAndSetCurrentPlaylists()
      );
    } catch (e) {
      Alert.alert("Error", "Not able to remove, please try again!!!");
    }
  };

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...globalStyles.darkBackgroundColor }}
      onPress={() =>
        navigation.navigate("GroupsList", {
          playlistName: playlistName,
          playlistUrl: playlistUrl,
        })
      }
    >
      <Text style={styles.playlistNameText}>{playlistName}</Text>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Remove playlist?",
            "Are you sure you want to remove this playlist?",
            [
              {
                text: "Yes",
                onPress: removePlaylist,
              },
              { text: "No" },
            ]
          );
        }}
      >
        <Image
          style={styles.deleteLogo}
          source={require(REMOVE_LOGO_LOCATION)}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomColor: "white",
    borderWidth: 1,
  },
  playlistNameText: {
    color: "white",
    fontSize: 20,
  },
  deleteLogo: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});

export default PlaylistItem;
