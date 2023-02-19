import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import SearchBar from "./SearchBar";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { globalStyles } from "../styles/Styles";
import ChannelListItem from "./ChannelListItem";

function ChannelsList() {
  const [searchText, setSearchText] = useState("");
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (Platform.OS === "android" && isFocused) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      ).catch((error) => console.log(error));
    }
  }, [isFocused]);

  const renderItem = ({
    item: {
      name,
      url,
      tvg: { logo },
    },
  }) => (
    <ChannelListItem
      channelIconUrl={logo}
      channelName={name}
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
          data={route.params.channelList?.filter((playlistItem) =>
            playlistItem.name
              .toUpperCase()
              .includes(searchText.trim().toUpperCase())
          )}
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
