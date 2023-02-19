import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { globalStyles } from "../styles/Styles";

function GroupListItem({ groupName, groupIconUrl, onPress }) {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...globalStyles.secondaryContainer }}
      onPress={onPress}
    >
      {groupIconUrl && (
        <Image style={styles.icon} source={{ uri: groupIconUrl }} />
      )}
      <Text style={globalStyles.headerText}>{groupName}</Text>
    </TouchableOpacity>
  );
}

GroupListItem.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupIconUrl: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

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

export default GroupListItem;
