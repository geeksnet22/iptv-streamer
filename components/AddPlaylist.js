import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LabelAndTextInputField from "./LabelAndTextInputField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { globalStyles } from "../styles/Styles";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../config";

// const DEFAULT_PORT = 80;

const db = getFirestore(app);

function AddPlaylist({ navigation, route }) {
  const [playlistName, setPlaylistName] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [serverUrl, setServerUrl] = useState("");
  // const [port, setPort] = useState("");
  const [playlistAddress, setPlaylistAddress] = useState("");

  // const addPlayist = () => {
  //   if (!isValidInputData()) {
  //     return;
  //   }
  //   let requestUrl = playlistAddress.trim();
  //   if (playlistAddress === "") {
  //     requestUrl = `${
  //       serverUrl.slice(serverUrl.length - 1) === "/"
  //         ? serverUrl.substring(0, serverUrl.length - 1)
  //         : serverUrl
  //     }:${
  //       port === "" ? DEFAULT_PORT : port
  //     }/playlist/${username}/${password}/m3u_plus`;
  //   }

  //   axios
  //     .get(requestUrl)
  //     .then((response) => {
  //       setPlaylistValue(requestUrl);
  //     })
  //     .catch((error) => {
  //       Alert.alert("Error", "Not a valid playist/user credentials!!!");
  //     });
  // };

  const addPlayist = () => {
    if (!isValidInputData()) {
      return;
    }
    const requestUrl = playlistAddress.trim();
    axios
      .get(requestUrl)
      .then((response) => {
        setPlaylistValue(requestUrl);
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          "Not a valid playlist, please try a different URL!!!"
        );
      });
  };

  const setPlaylistValue = async (requestUrl) => {
    try {
      await AsyncStorage.setItem(playlistName, requestUrl).then((value) => {
        navigation.navigate("CurrentPlaylists");
        Platform.OS === "android"
          ? ToastAndroid.show(
              "Playlist successfully added!!!",
              ToastAndroid.SHORT
            )
          : {};
        addPlayistToDb(requestUrl);
      });
    } catch (e) {
      Alert.alert("Error", "Error saving the playlist. Please try again.");
    }
  };

  const isValidInputData = () => {
    let isValidInputData = true;
    if (playlistName === "") {
      Alert.alert("Error", "Please enter playist name!!!");
      isValidInputData = false;
    } else if (route.params.existingPlaylistNames.includes(playlistName)) {
      Alert.alert(
        "Error",
        "Playlist already exists. Please use a different name!!!"
      );
      isValidInputData = false;
    } else if (playlistAddress === "") {
      Alert.alert("Error", "Please enter playlist url!!!");
      isValidInputData = false;
    }
    return isValidInputData;
  };

  const addPlayistToDb = async (requestUrl) => {
    try {
      const docRef = await addDoc(collection(db, "playlists"), {
        name: playlistName,
        url: requestUrl,
      });
      console.log("Playlist successfully added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error uploading playlist: ", error);
    }
  };

  // const isValidInputData = () => {
  //   let isValidInputData = true;
  //   if (
  //     username === "" &&
  //     password === "" &&
  //     serverUrl === "" &&
  //     playlistAddress === ""
  //   ) {
  //     Alert.alert("Error", "Please enter user credentials or playlist url!!!");
  //     isValidInputData = false;
  //   } else if (
  //     playlistAddress !== "" &&
  //     (username !== "" || password !== "" || serverUrl !== "" || port !== "")
  //   ) {
  //     Alert.alert(
  //       "Error",
  //       "Please enter either user credentials or the playlist url!!!"
  //     );
  //     isValidInputData = false;
  //   } else if (
  //     playlistAddress === "" &&
  //     (username !== "" || password !== "" || serverUrl !== "") &&
  //     (username === "" || password === "" || serverUrl === "")
  //   ) {
  //     Alert.alert("Error", "Please enter complete credentials");
  //     isValidInputData = false;
  //   } else if (playlistName === "") {
  //     Alert.alert("Error", "Please enter playist name!!!");
  //     isValidInputData = false;
  //   } else if (route.params.existingPlaylistNames.includes(playlistName)) {
  //     Alert.alert(
  //       "Error",
  //       "Playlist already exists. Please use a different name!!!"
  //     );
  //     isValidInputData = false;
  //   }
  //   return isValidInputData;
  // };

  return (
    <KeyboardAwareScrollView
      style={{
        ...styles.container,
        ...globalStyles.primaryContainer,
      }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View
        style={{
          ...styles.credentialsContainer,
          ...globalStyles.secondaryContainer,
        }}
      >
        <LabelAndTextInputField
          label="Playlist name"
          inputText={playlistName}
          setInputText={setPlaylistName}
          placeHolder="Name your playlist..."
          textContentType="name"
        />
        {/* <View style={styles.playlistNameSeparator} /> */}
        {/* <Text style={{ ...globalStyles.headerText, ...styles.headerText }}>
          Please enter M3U Playlist URL or Playlist Credentials (not both)
        </Text> */}
        <LabelAndTextInputField
          label="M3U Playlist URL"
          inputText={playlistAddress}
          setInputText={setPlaylistAddress}
          placeHolder="Playlist URL..."
          textContentType="URL"
        />
        {/* <Text style={{ ...globalStyles.headerText, ...styles.separatorText }}>
          ---OR---
        </Text>
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
        /> */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            addPlayist();
          }}
        >
          <Text style={globalStyles.basicText}>Add</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
  },
  credentialsContainer: {
    padding: 10,
    borderRadius: 10,
  },
  // playlistNameSeparator: {
  //   borderWidth: 1,
  //   borderColor: "white",
  //   borderStyle: "dashed",
  // },
  // headerText: {
  //   color: "yellow",
  //   alignSelf: "flex-start",
  //   fontStyle: "italic",
  // },
  // separatorText: {
  //   alignSelf: "center",
  //   fontStyle: "italic",
  // },
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
});

export default AddPlaylist;
