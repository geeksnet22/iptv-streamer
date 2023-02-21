import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Alert, FlatList } from "react-native";
import SearchBar from "./SearchBar";
import GroupListItem from "./GroupListItem";
import axios from "axios";
import { parse, Playlist, PlaylistItem } from "iptv-playlist-parser";
import { ActivityIndicator } from "react-native";
import React = require("react");
import { Styles } from "../styles/Styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "GroupList">;

const GroupList = ({navigation, route}: Props) => {
  const [parsedData, setParsedData] = useState<Playlist | null>(null);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAndSetPlaylistsData();
  }, []);

  const fetchAndSetPlaylistsData = async () => {
    if (route.params.playlistURL) {
      axios
      .get(route.params.playlistURL)
      .then((response) => {
        setParsedData(parse(response.data));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        Alert.alert("Error", "Error loading playlist. Please try again!!!");
      });
    }
  };


  const renderGroupItem = (playlistItem: PlaylistItem) => {
    return (
      <GroupListItem
        groupName={playlistItem.group.title}
        onPress={() =>
          navigation.navigate("ChannelList", {
            groupTitle: playlistItem.group.title,
            channelList: parsedData?.items.filter(
              (playistItem) => playistItem.group.title === playistItem.group.title
            ),
          })
        }
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        ...Styles.globalStyles.primaryContainer,
      }}
    >
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <View style={styles.itemListContainer}>
        <FlatList
          data={[
            ...new Map(
              parsedData?.items.map((playistItem) => [
                playistItem.group.title,
                playistItem,
              ])
            ).values(),
          ].filter((playistItem) =>
            playistItem.group.title
              .toUpperCase()
              .includes(searchText.trim().toUpperCase())
          )}
          renderItem={({item}) => renderGroupItem(item)}
          keyExtractor={(item) => item.group.title}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={Styles.globalStyles.activityIndicator}
        />
      ) : (
        <></>
      )}
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

export default GroupList;
