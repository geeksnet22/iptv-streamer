import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "./styles/Styles";

function FloatingRoundButton({ style, icon, onPress }) {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...style,
        ...globalStyles.darkBackgroundColor,
      }}
      onPress={onPress}
    >
      <Image style={styles.image} source={icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
