import React, { useState } from "react";
import { View, FlatList, SafeAreaView, StyleSheet } from "react-native";
import ListItem from "./ListItem";
import SearchBar from "./SearchBar";

function ChannelsList({ navigation, route }) {
  const [searchText, setSearchText] = useState("");

  const renderItem = ({ item }) => (
    <ListItem
      id={item.id}
      icon={item.icon}
      name={item.name}
      onPress={() =>
        navigation.navigate("VideoPlayer", { name: item.name, uri: item.url })
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
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
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  itemListContainer: {
    margin: 5,
    maxWidth: 600,
    marginBottom: 30,
  },
});

export default ChannelsList;
