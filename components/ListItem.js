import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { globalStyles } from "../styles/Styles";

function ListItem({ iconUrl, name, onPress }) {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...globalStyles.secondaryContainer }}
      onPress={onPress}
    >
      {iconUrl && <Image style={styles.icon} source={{ uri: iconUrl }} />}
      <Text style={globalStyles.headerText}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
    fontSize: 15,
  },
});

export default ListItem;
