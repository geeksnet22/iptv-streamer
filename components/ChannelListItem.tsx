/** @format */

import * as React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Styles } from '../styles/Styles';

type Props = {
  channelName: string;
  channelIconUrl: string;
  onPress: () => void;
};

const ChannelListItem = ({ channelName, channelIconUrl, onPress }: Props) => (
  <TouchableOpacity
    style={{ ...styles.container, ...Styles.globalStyles.secondaryContainer }}
    onPress={onPress}
  >
    {channelIconUrl ? (
      <Image
        style={styles.icon}
        source={{ uri: channelIconUrl }}
      />
    ) : (
      <></>
    )}
    <Text style={Styles.globalStyles.headerText}>{channelName}</Text>
  </TouchableOpacity>
);

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

export default ChannelListItem;
