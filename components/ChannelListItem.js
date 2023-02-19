import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { globalStyles } from "../styles/Styles";

function ChannelListItem({ channelName, channelIconUrl, onPress }) {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...globalStyles.secondaryContainer }}
      onPress={onPress}
    >
      {channelIconUrl && (
        <Image style={styles.icon} source={{ uri: channelIconUrl }} />
      )}
      <Text style={globalStyles.headerText}>{channelName}</Text>
    </TouchableOpacity>
  );
}

ChannelListItem.propTypes = {
  channelName: PropTypes.string.isRequired,
  channelIconUrl: PropTypes.string.isRequired,
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

export default ChannelListItem;
