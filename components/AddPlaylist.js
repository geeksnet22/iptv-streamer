import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LabelAndTextInputField from "./LabelAndTextInputField";
import { TouchableOpacity } from "react-native-gesture-handler";

const DEFAULT_PORT = 80;

function AddPlaylist({ navigation, route }) {
  const [playlistName, setPlaylistName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverURL, setServerURL] = useState("");
  const [port, setPort] = useState("");
  const [playlistAddress, setPlaylistAddress] = useState("");

  const addPlayist = () => {
    if (!isValidInputData()) {
      return;
    }
    let requestUrl = playlistAddress;
    if (playlistAddress === "") {
      requestUrl = `${serverURL}:${
        port === "" ? DEFAULT_PORT : port
      }/playlist/${username}/${password}/m3u_plus`;
    }
    axios
      .get(requestUrl)
      .then((response) => {
        setPlaylistValue(requestUrl);
      })
      .catch((error) => {
        Alert.alert("Error", "Not a valid playist/user credentials!!!");
      });
  };

  const setPlaylistValue = async (requestUrl) => {
    try {
      await AsyncStorage.setItem(playlistName, requestUrl)
        .then((value) => navigation.navigate("CurrentPlaylists"))
        .catch((error) => console.log(error));
    } catch (e) {
      Alert.alert("Error", "Error saving the playlist. Please try again.");
    }
  };

  const isValidInputData = () => {
    let isValidInputData = true;
    if (
      username === "" &&
      password === "" &&
      serverURL === "" &&
      playlistAddress === ""
    ) {
      Alert.alert("Error", "Please enter user credentials or playlist url!!!");
      isValidInputData = false;
    } else if (
      playlistAddress !== "" &&
      (username !== "" || password !== "" || serverURL !== "" || port !== "")
    ) {
      Alert.alert(
        "Error",
        "Please enter either user credentials or the playlist url!!!"
      );
      isValidInputData = false;
    } else if (
      playlistAddress === "" &&
      (username !== "" || password !== "" || serverURL !== "") &&
      (username === "" || password === "" || serverURL === "")
    ) {
      Alert.alert("Error", "Please enter complete credentials");
      isValidInputData = false;
    } else if (playlistName === "") {
      Alert.alert("Error", "Please enter playist name!!!");
      isValidInputData = false;
    } else if (route.params.existingPlaylistNames.includes(playlistName)) {
      Alert.alert(
        "Error",
        "Playlist already exists. Please use a different name!!!"
      );
      isValidInputData = false;
    }
    return isValidInputData;
  };

  return (
    <View style={styles.container}>
      <LabelAndTextInputField
        label="Playlist name"
        inputText={playlistName}
        setInputText={setPlaylistName}
        placeHolder="Could be anything..."
        textContentType="name"
      />
      <Text style={styles.headerText}>Please enter your credentials</Text>
      <LabelAndTextInputField
        label="Username"
        inputText={username}
        setInputText={setUsername}
        placeHolder="Username..."
        textContentType="username"
      />
      <LabelAndTextInputField
        label="Password"
        inputText={password}
        setInputText={setPassword}
        placeHolder="Password..."
        textContentType="password"
      />
      <LabelAndTextInputField
        label="Server URL"
        inputText={serverURL}
        setInputText={setServerURL}
        placeHolder="Server URL..."
        textContentType="URL"
      />
      <LabelAndTextInputField
        label="Port"
        inputText={port}
        setInputText={setPort}
        placeHolder="Port (if available)"
        textContentType="none"
      />
      <Text style={styles.separatorText}>---or---</Text>
      <LabelAndTextInputField
        label="M3U Playlist URL"
        inputText={playlistAddress}
        setInputText={setPlaylistAddress}
        placeHolder="Playlist URL..."
        textContentType="URL"
      />
      <View style={styles.addButton}>
        <TouchableOpacity
          onPress={() => {
            addPlayist();
          }}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "black",
  },
  headerText: {
    fontSize: 20,
    color: "white",
    alignSelf: "flex-start",
    fontStyle: "italic",
  },
  separatorText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    fontStyle: "italic",
  },
  addButton: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 5,
    backgroundColor: "green",
    marginVertical: 10,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default AddPlaylist;