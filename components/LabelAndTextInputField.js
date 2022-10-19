import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function LabelAndTextInputField({
  label,
  inputText,
  setInputText,
  placeHolder,
  textContentType,
}) {
  console.log(textContentType);
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
        secureTextEntry
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    marginHorizontal: 10,
    flex: 1,
    textAlign: "center",
    color: "white",
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    backgroundColor: "white",
    height: 40,
    flexDirection: "column",
    flex: 1,
    fontSize: 15,
  },
});

export default LabelAndTextInputField;
