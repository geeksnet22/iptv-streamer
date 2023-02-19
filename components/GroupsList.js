import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Alert, FlatList } from "react-native";
import SearchBar from "./SearchBar";
import { globalStyles } from "../styles/Styles";
import { useNavigation, useRoute } from "@react-navigation/core";
import GroupListItem from "./GroupListItem";
import axios from "axios";
import parser from "iptv-playlist-parser";
import { ActivityIndicator } from "react-native";

function GroupsList() {
  const [parsedData, setParsedData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    fetchAndSetPlaylistsData();
  }, []);

  fetchAndSetPlaylistsData = async () => {
    axios
      .get(route.params.playlistURL)
      .then((response) => {
        setParsedData(parser.parse(response.data));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        Alert.alert("Error", "Error loading playlist. Please try again!!!");
      });
  };

  const renderGroupItem = ({ item }) => {
    return (
      <GroupListItem
        groupName={item.group.title}
        onPress={() =>
          navigation.navigate("ChannelsList", {
            groupTitle: item.group.title,
            channelList: parsedData.items?.filter(
              (playistItem) => playistItem.group.title === item.group.title
            ),
          })
        }
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        ...globalStyles.primaryContainer,
      }}
    >
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <View style={styles.itemListContainer}>
        <FlatList
          data={[
            ...new Map(
              parsedData.items?.map((playistItem) => [
                playistItem.group.title,
                playistItem,
              ])
            ).values(),
          ].filter((playistItem) =>
            playistItem.group.title
              .toUpperCase()
              .includes(searchText.trim().toUpperCase())
          )}
          renderItem={renderGroupItem}
          keyExtractor={(item) => item.group.title}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={globalStyles.activityIndicator}
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

export default GroupsList;
