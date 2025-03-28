/** @format */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Styles } from '../styles/styles';

type Props = {
  label: string;
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  placeholder: string;
  textContentType: TextInputProps['textContentType'];
  editable: boolean;
  secureTextEntry?: boolean;
};

const LabelAndTextInputField = ({
  label,
  inputText,
  setInputText,
  placeholder,
  textContentType,
  editable,
  secureTextEntry = false,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={Styles.globalStyles.basicText}>{`${label}`}</Text>
      <TextInput
        style={Styles.globalStyles.textInput}
        textContentType={textContentType}
        value={inputText}
        onChangeText={setInputText}
        placeholder={placeholder}
        autoCapitalize="none"
        autoComplete="off"
        editable={editable}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 5,
    alignItems: 'flex-start',
  },
});

export default LabelAndTextInputField;
