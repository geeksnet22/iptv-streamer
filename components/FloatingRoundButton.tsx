import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { Styles } from "../styles/Styles";

type Props = {
  style: React.CSSProperties,
  icon: number,
  onPress: () => void
}

const FloatingRoundButton = ({ style, icon, onPress }: Props) => {
  return (
    <TouchableOpacity
      // style={{
      //   ...styles.container,
      //   ...style,
      //   ...Styles.globalStyles.secondaryContainer,
      // }}
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
