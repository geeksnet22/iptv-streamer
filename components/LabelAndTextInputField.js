import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { globalStyles } from "../styles/Styles";

function LabelAndTextInputField({
  label,
  inputText,
  setInputText,
  placeHolder,
  textContentType,
}) {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.basicText}>{`${label}`}</Text>
      <TextInput
        style={globalStyles.textInput}
        textContentType={textContentType}
        value={inputText}
        onChangeText={setInputText}
        placeholder={placeHolder}
        autoCapitalize="none"
        autoComplete="off"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 5,
    alignItems: "flex-start",
  },
});

export default LabelAndTextInputField;
