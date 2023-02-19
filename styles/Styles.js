import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  secondaryContainer: {
    backgroundColor: "#5a5a58",
  },
  basicText: {
    color: "#ffffff",
    fontSize: 20,
  },
  headerText: {
    color: "#ffffff",
    fontWeight: "bold",
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
  activityIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});
