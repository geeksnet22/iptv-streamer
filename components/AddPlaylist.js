import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LabelAndTextInputField from "./LabelAndTextInputField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const DEFAULT_PORT = 80;

function AddPlaylist({ navigation, route }) {
  const [playlistName, setPlaylistName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [port, setPort] = useState("");
  const [playlistAddress, setPlaylistAddress] = useState("");

  const addPlayist = () => {
    if (!isValidInputData()) {
      return;
    }
    let requestUrl = playlistAddress;
    if (playlistAddress === "") {
      requestUrl = `${
        serverUrl.slice(serverUrl.length - 1) === "/"
          ? serverUrl.substring(0, serverUrl.length - 1)
          : serverUrl
      }:${
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
      serverUrl === "" &&
      playlistAddress === ""
    ) {
      Alert.alert("Error", "Please enter user credentials or playlist url!!!");
      isValidInputData = false;
    } else if (
      playlistAddress !== "" &&
      (username !== "" || password !== "" || serverUrl !== "" || port !== "")
    ) {
      Alert.alert(
        "Error",
        "Please enter either user credentials or the playlist url!!!"
      );
      isValidInputData = false;
    } else if (
      playlistAddress === "" &&
      (username !== "" || password !== "" || serverUrl !== "") &&
      (username === "" || password === "" || serverUrl === "")
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
    <KeyboardAwareScrollView style={styles.container}>
      <LabelAndTextInputField
        label="Playlist name"
        inputText={playlistName}
        setInputText={setPlaylistName}
        placeHolder="Could be anything..."
        textContentType="name"
      />
      <View style={styles.credentialsContainer}>
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
          inputText={serverUrl}
          setInputText={setServerUrl}
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
      </View>

      <Text style={styles.separatorText}>---or---</Text>
      <LabelAndTextInputField
        label="M3U Playlist URL"
        inputText={playlistAddress}
        setInputText={setPlaylistAddress}
        placeHolder="Playlist URL..."
        textContentType="URL"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addPlayist();
          }}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    backgroundColor: "black",
  },
  credentialsContainer: {
    backgroundColor: "#403B3B",
    padding: 10,
    borderRadius: 10,
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
  buttonContainer: {
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: 10,
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default AddPlaylist;
