import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SearchBar from "./SearchBar";

function ChannelsList({ navigation, route }) {
  const [searchText, setSearchText] = useState("");

  const Item = ({ logo, name, url }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("VideoPlayer", { name: name, uri: url })
      }
    >
      <Image
        style={styles.logo}
        source={{
          uri: logo,
        }}
      />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item id={item.id} logo={item.logo} name={item.name} url={item.url} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FlatList
        data={route.params.channelsInfo
          ?.filter((channel) =>
            channel.channelName
              .toUpperCase()
              .includes(searchText.trim().toUpperCase())
          )
          .map((channel) => ({
            logo: channel.channelLogo,
            name: channel.channelName,
            url: channel.channelUrl,
          }))}
        renderItem={renderItem}
        keyExtractor={(item) => item.name + item.url}
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
    width: "70%",
    maxWidth: 300,
    flexGrow: 1,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    flexShrink: 1,
  },
});

export default ChannelsList;