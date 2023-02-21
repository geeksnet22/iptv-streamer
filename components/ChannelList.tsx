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
} from "@react-navigation/native";
import ChannelListItem from "./ChannelListItem";
import { Styles } from "../styles/Styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { PlaylistItem } from "iptv-playlist-parser";

type Props = NativeStackScreenProps<RootStackParamList, "ChannelList">;

const ChannelList = ({route, navigation}: Props) => {
  const [searchText, setSearchText] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (Platform.OS === "android" && isFocused) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      ).catch((error) => console.log(error));
    }
  }, [isFocused]);

  type ItemProps = {
    name: string,
    url: string,
    tvg: {
      logo: string
    },
  }

  const renderItem = ({
      name,
      url,
      tvg: { logo },
  }: ItemProps) => (
    <ChannelListItem
      channelIconUrl={logo}
      channelName={name}
      onPress={() =>
        navigation.navigate("VideoPlayer", { uri: url })
      }
    />
  );

  return (
    <SafeAreaView
      style={{
        ...Styles.globalStyles.primaryContainer,
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
          renderItem={({item}) => renderItem(item)}
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

export default ChannelList;
