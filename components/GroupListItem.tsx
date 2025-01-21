/** @format */

import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { Styles } from '../styles/styles';

type Props = {
  groupName: string;
  groupIconUrl?: string;
  numberOfChannels: number;
  onPress: () => void;
};

const GroupListItem = ({
  groupName,
  groupIconUrl,
  numberOfChannels,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.container,
        Styles.globalStyles.secondaryContainer,
      ])}
      onPress={onPress}
    >
      <View style={styles.row}>
        {groupIconUrl && (
          <Image
            style={styles.icon}
            source={{ uri: groupIconUrl }}
          />
        )}
        <Text style={Styles.globalStyles.headerText}>{groupName}</Text>
      </View>
      <Text style={Styles.globalStyles.headerText}>{numberOfChannels}</Text>
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
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
});

export default GroupListItem;
