import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";

function ListItem({ iconUrl, name, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {iconUrl && <Image style={styles.icon} source={{ uri: iconUrl }} />}
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#403B3B",
    flexGrow: 1,
    borderBottomColor: "white",
    borderWidth: 1,
    minHeight: 75,
    borderBottomLeftRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ListItem;
