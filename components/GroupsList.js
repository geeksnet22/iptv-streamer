import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Alert, FlatList } from "react-native";
import parser from "iptv-playlist-parser";
import axios from "axios";
import SearchBar from "./SearchBar";
import ListItem from "./ListItem";

const globalStyles = require("./styles/Styles");

function GroupsList({ navigation, route }) {
  const [groups, setGroups] = useState({});
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get(route.params.playlistUrl)
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
                  channelLogoUrl: item.tvg.logo,
                },
              ])
            : (tempGroups[item.group.title] = [
                {
                  channelName: item.name,
                  channelUrl: item.url,
                  channelLogoUrl: item.tvg.logo,
                },
              ]);
        });
        setGroups(tempGroups);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "Error loading playlist. Please try again!!!");
      });
  }, []);

  const renderItem = ({ item }) => (
    <ListItem
      id={item.id}
      name={item.groupName}
      onPress={() =>
        navigation.navigate("ChannelsList", {
          groupName: item.groupName,
          channelsInfo: item.channelsInfo,
        })
      }
    />
  );

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        ...globalStyles.containerDarkBackgroundColor,
      }}
    >
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <View style={styles.itemListContainer}>
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
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemListContainer: {
    margin: 5,
    maxWidth: 600,
    marginBottom: 30,
  },
});

export default GroupsList;
