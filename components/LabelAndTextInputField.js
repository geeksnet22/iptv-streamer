import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function LabelAndTextInputField({
  label,
  inputText,
  setInputText,
  placeHolder,
  textContentType,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`${label}`}</Text>
      <TextInput
        style={styles.textInput}
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
  label: {
    fontSize: 20,
    color: "white",
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    backgroundColor: "white",
    height: 40,
    fontSize: 15,
    width: "100%",
    alignSelf: "center",
  },
});

export default LabelAndTextInputField;
