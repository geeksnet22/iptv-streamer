import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { globalStyles } from "../styles/Styles";

function LabelAndTextInputField({
  label,
  inputText,
  setInputText,
  placeholder,
  textContentType,
  editable,
}) {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.basicText}>{`${label}`}</Text>
      <TextInput
        style={globalStyles.textInput}
        textContentType={textContentType}
        value={inputText}
        onChangeText={setInputText}
        placeholder={placeholder}
        autoCapitalize="none"
        autoComplete="off"
        editable={editable}
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

LabelAndTextInputField.propTypes = {
  label: PropTypes.string.isRequired,
  inputText: PropTypes.string.isRequired,
  setInputText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  textContentType: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
};

export default LabelAndTextInputField;
