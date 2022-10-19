import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import parser from "iptv-playlist-parser";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import SearchBar from "./SearchBar";

function GroupsList({ navigation, route }) {
  const [groups, setGroups] = useState({});
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get(route.params.playlistURL)
      .then((response) => {
        const tempGroups = {};
        const parsedData = parser.parse(response?.data);
        parsedData?.items?.forEach((item) => {
          item.group.title in tempGroups
            ? (tempGroups[item.group.title] = [
                ...tempGroups[item.group.title],
                {
                  channelName: item.name,
                  channelUrl: item.url,
                  channelLogo: item.tvg.logo,
                },
              ])
            : (tempGroups[item.group.title] = [
                {
                  channelName: item.name,
                  channelUrl: item.url,
                  channelLogo: item.tvg.logo,
                },
              ]);
        });
        setGroups(tempGroups);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Item = ({ groupName, channelsInfo }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("ChannelsList", {
          groupName: groupName,
          channelsInfo: channelsInfo,
        })
      }
    >
      <Image
        style={styles.logo}
        source={{
          uri: "https://images.freeimages.com/images/large-previews/cb5/spooky-tv-ghost-static-1535787.jpg",
        }}
      />
      <Text style={styles.name}>{groupName}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item groupName={item.groupName} channelsInfo={item.channelsInfo} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FlatList
        data={Object.entries(groups)
          .filter((entry) =>
            entry[0].toUpperCase().includes(searchText.trim().toUpperCase())
          )
          .map((entry) => ({
            groupName: entry[0],
            channelsInfo: entry[1],
          }))}
        renderItem={renderItem}
        keyExtractor={(item) => item.groupName}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#403B3B",
    borderRadius: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "stretch",
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default GroupsList;
