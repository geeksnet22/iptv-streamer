import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExistingPlaylistItem from "./ExistingPlaylistItem";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import FloatingRoundButton from "./FloatingRoundButton";
import { globalStyles } from "../styles/Styles";

const ADD_LOGO_ADDRESS = "../assets/add-gb2bab072c_640.png";

function ExistingPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      fetchAndSetExistingPlaylists();
    }
  }, [isFocused]);

  const fetchAndSetExistingPlaylists = async () => {
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

  const renderItem = ({ item: { playlistName, playlistUrl } }) => (
    <ExistingPlaylistItem
      key={playlistName}
      playlistName={playlistName}
      playlistURL={playlistUrl}
      fetchAndSetExistingPlaylists={fetchAndSetExistingPlaylists}
    />
  );

  return (
    <View
      style={
        playlists.length === 0
          ? {
              ...styles.container,
              ...globalStyles.primaryContainer,
              justifyContent: "center",
            }
          : {
              ...styles.container,
              ...globalStyles.primaryContainer,
            }
      }
    >
      {playlists.length === 0 ? (
        <Text
          style={{
            ...globalStyles.basicText,
            alignSelf: "center",
            fontStyle: "italic",
            flexDirection: "column",
          }}
        >
          Please add a playlist
        </Text>
      ) : null}
      <View style={styles.playlistWrapper}>
        <FlatList
          data={playlists.map((playlist) => ({
            playlistName: playlist[0],
            playlistUrl: playlist[1],
          }))}
          renderItem={renderItem}
          keyExtractor={(item) => item.playlistName}
        />
      </View>

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
    maxWidth: 600,
  },
  playlistWrapper: {
    margin: 5,
    maxWidth: 600,
    marginBottom: 20,
  },
  floatingButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 30,
  },
});

export default ExistingPlaylists;
