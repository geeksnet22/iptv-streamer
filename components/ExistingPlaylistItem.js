import React from "react";
import { Text, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../styles/Styles";
import { useNavigation } from "@react-navigation/core";
import PropTypes from "prop-types";

const REMOVE_LOGO_LOCATION = "../assets/icons8-remove-48.png";

function ExistingPlaylistItem({
  playlistName,
  playlistURL,
  fetchAndSetExistingPlaylists,
}) {
  const navigation = useNavigation();

  const removePlaylist = async () => {
    try {
      await AsyncStorage.removeItem(playlistName).then((response) =>
        fetchAndSetExistingPlaylists()
      );
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Not able to remove, please try again!!!");
    }
  };

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...globalStyles.secondaryContainer }}
      onPress={() =>
        navigation.navigate("GroupsList", {
          playlistName: playlistName,
          playlistURL: playlistURL,
        })
      }
    >
      <Text style={globalStyles.basicText}>{playlistName}</Text>
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

ExistingPlaylistItem.propTypes = {
  playlistName: PropTypes.string.isRequired,
};

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
  deleteLogo: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});

export default ExistingPlaylistItem;
