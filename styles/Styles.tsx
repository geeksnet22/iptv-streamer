/** @format */

import { StyleSheet } from 'react-native';

export const Styles = {
  globalStyles: StyleSheet.create({
    primaryContainer: {
      flex: 1,
      backgroundColor: '#121212', // Jet Black
    },
    secondaryContainer: {
      backgroundColor: '#1E1E1E', // Charcoal Black
    },
    basicText: {
      color: '#FFFFFF', // White
      fontSize: 20,
    },
    headerText: {
      color: '#FFFFFF', // White
      fontWeight: 'bold',
      flexShrink: 1,
    },
    mutedText: {
      color: '#B3B3B3', // Light Gray
      fontSize: 18,
    },
    textInput: {
      borderRadius: 10,
      borderWidth: 1,
      padding: 5,
      backgroundColor: '#1E1E1E', // Charcoal Black
      color: '#FFFFFF', // White
      height: 40,
      fontSize: 15,
      width: '100%',
      alignSelf: 'center',
    },
    button: {
      backgroundColor: '#BB86FC', // Lavender Purple
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF', // White
      fontSize: 18,
    },
    activityIndicator: {
      position: 'absolute',
      top: '50%',
      left: '50%',
    },
  }),
};
