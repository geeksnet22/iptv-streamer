import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlaylistItem from "./PlaylistItem";
import { useIsFocused } from "@react-navigation/native";
import FloatingRoundButton from "./FloatingRoundButton";
import { globalStyles } from "./styles/Styles";

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
    navigation.navigate("PlaylistName", {
      existingPlaylistNames: playlists.map((playlist) => playlist[0]),
    });

  const renderItem = ({ item: { playlistName, playlistUrl } }) => (
    <PlaylistItem
      key={playlistName}
      playlistName={playlistName}
      playlistUrl={playlistUrl}
      navigation={navigation}
      route={route}
      fetchAndSetCurrentPlaylists={fetchAndSetCurrentPlaylists}
    />
  );

  return (
    <View
      style={
        playlists.length === 0
          ? {
              ...styles.container,
              ...globalStyles.containerDarkBackgroundColor,
              justifyContent: "center",
            }
          : {
              ...styles.container,
              ...globalStyles.containerDarkBackgroundColor,
            }
      }
    >
      {playlists.length === 0 ? (
        <Text
          style={{
            color: "white",
            fontSize: 20,
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
    flex: 1,
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

export default CurrentPlaylists;
