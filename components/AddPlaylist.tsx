import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LabelAndTextInputField from "./LabelAndTextInputField";
import {
  collection,
  addDoc,
  initializeFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../config";
import { Styles } from "../styles/Styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React = require("react");
import { RootStackParamList } from "../types";

const db = initializeFirestore(app, { experimentalForceLongPolling: true });

type Props = NativeStackScreenProps<RootStackParamList, "AddPlaylist">;

function AddPlaylist({route, navigation}: Props) {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistURL, setplaylistURL] = useState("");
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const addPlayist = () => {
    if (!isValidInputData()) {
      return;
    }
    setShowActivityIndicator(true);
    axios
      .get(playlistURL.trim())
      .then((response) => {
        storePlaylist();
      })
      .catch((e) => {
        console.log(e);
        setShowActivityIndicator(false);
        Alert.alert(
          "Error",
          "Not a valid playlist, please try a different URL!!!"
        );
      });
  };

  const isValidInputData = () => {
    let isValidInputData = true;
    if (playlistName === "") {
      Alert.alert("Error", "Please enter playist name!!!");
      isValidInputData = false;
    } else if (
      route.params.existingPlaylistNames.includes(playlistName.trim())
    ) {
      Alert.alert(
        "Error",
        `Playlist with name ${playlistName.trim()} already exists. Please use a different name!!!`
      );
      isValidInputData = false;
    } else if (playlistURL === "") {
      Alert.alert("Error", "Please enter playlist url!!!");
      isValidInputData = false;
    }
    return isValidInputData;
  };

  const storePlaylist = async () => {
    try {
      await AsyncStorage.setItem(playlistName, playlistURL).then((value) => {
        setShowActivityIndicator(false);
        navigation.navigate("ExistingPlaylists");
        Platform.OS === "android"
          ? ToastAndroid.show(
              "Playlist successfully added!!!",
              ToastAndroid.SHORT
            )
          : {};
        // addPlayistToDb();
      });
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Error saving the playlist. Please try again.");
    }
  };

  const addPlayistToDb = async () => {
    try {
      const docRef = await addDoc(collection(db, "playlists"), {
        name: playlistName,
        url: playlistURL.trim(),
        createdAt: serverTimestamp(),
      });
      console.log("Playlist successfully added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error uploading playlist: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        ...styles.container,
        ...Styles.globalStyles.primaryContainer,
      }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View
        style={{
          ...styles.credentialsContainer,
          ...Styles.globalStyles.secondaryContainer,
        }}
      >
        <LabelAndTextInputField
          label="Playlist name"
          inputText={playlistName}
          setInputText={setPlaylistName}
          placeholder="Name your playlist..."
          textContentType="name"
          editable={!showActivityIndicator}
        />
        <LabelAndTextInputField
          label="M3U Playlist URL"
          inputText={playlistURL}
          setInputText={setplaylistURL}
          placeholder="Playlist URL..."
          textContentType="URL"
          editable={!showActivityIndicator}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={showActivityIndicator}
          style={{ ...styles.addButton }}
          onPress={() => addPlayist()}
        >
          <Text style={Styles.globalStyles.basicText}>Add</Text>
        </TouchableOpacity>
      </View>
      {showActivityIndicator ? (
        <ActivityIndicator
          size="large"
          style={{
            ...Styles.globalStyles.activityIndicator,
          }}
        />
      ) : (
        <></>
      )}
    </KeyboardAvoidingView>
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
