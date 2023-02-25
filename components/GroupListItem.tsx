/** @format */

import * as React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Styles } from '../styles/Styles';

type Props = {
  groupName: string;
  groupIconUrl?: string;
  onPress: () => void;
};

const GroupListItem = ({ groupName, groupIconUrl, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...Styles.globalStyles.secondaryContainer }}
      onPress={onPress}
    >
      {groupIconUrl ? (
        <Image
          style={styles.icon}
          source={{ uri: groupIconUrl }}
        />
      ) : (
        <></>
      )}
      <Text style={Styles.globalStyles.headerText}>{groupName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'white',
    borderWidth: 1,
    minHeight: 75,
    borderBottomLeftRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 15,
  },
});

export default GroupListItem;
