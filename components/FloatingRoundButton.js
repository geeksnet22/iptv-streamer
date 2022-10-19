import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

function FloatingRoundButton({ style, icon, onPress }) {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={onPress}
    >
      <Image style={styles.image} source={icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#403B3B",
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 30,
    width: 30,
  },
});

export default FloatingRoundButton;
