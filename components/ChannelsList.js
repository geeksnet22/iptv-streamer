import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import ListItem from "./ListItem";
import SearchBar from "./SearchBar";
import * as ScreenOrientation from "expo-screen-orientation";
import { useIsFocused } from "@react-navigation/native";
import { globalStyles } from "../styles/Styles";

function ChannelsList({ navigation, route }) {
  const [searchText, setSearchText] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (Platform.OS === "android" && isFocused) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      ).catch((error) => console.log(error));
    }
  }, [isFocused]);

  const renderItem = ({ item: { id, iconUrl, name, url } }) => (
    <ListItem
      id={id}
      iconUrl={iconUrl}
      name={name}
      onPress={() =>
        navigation.navigate("VideoPlayer", { name: name, uri: url })
      }
    />
  );

  return (
    <SafeAreaView
      style={{
        ...globalStyles.primaryContainer,
      }}
    >
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <View style={styles.itemListContainer}>
        <FlatList
          data={route.params.channelsInfo
            ?.filter((channel) =>
              channel.channelName
                .toUpperCase()
                .includes(searchText.trim().toUpperCase())
            )
            .map((channel) => ({
              iconUrl: channel.channelLogoUrl,
              name: channel.channelName,
              url: channel.channelUrl,
            }))}
          renderItem={renderItem}
          keyExtractor={(item) => item.name + item.url}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemListContainer: {
    margin: 5,
    maxWidth: 600,
    marginBottom: 30,
  },
});

export default ChannelsList;
