import * as React from "react";
import { TextInput, StyleSheet } from "react-native";

type Props = {
  searchText: string,
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}

function SearchBar({ searchText, setSearchText }: Props) {
  return (
    <TextInput
      style={styles.textInput}
      onChangeText={setSearchText}
      value={searchText}
      placeholder="Search..."
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    backgroundColor: "white",
    margin: 5,
    marginBottom: 0,
    height: 40,
  },
});

export default SearchBar;
