/** @format */

import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Alert, FlatList } from 'react-native';
import SearchBar from './SearchBar';
import GroupListItem from './GroupListItem';
import axios from 'axios';
import { parse, Playlist } from 'iptv-playlist-parser';
import { ActivityIndicator } from 'react-native';
import { Styles } from '../styles/Styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import * as React from 'react';
import { async } from '@firebase/util';

type Props = NativeStackScreenProps<RootStackParamList, 'GroupList'>;

const All_CHANNELS_GROUP_NAME = 'All Channels';

const GroupList = ({ navigation, route }: Props) => {
  const [parsedData, setParsedData] = useState<Playlist | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAndSetPlaylistsData();
  }, []);

  const fetchAndSetPlaylistsData = async () => {
    if (route.params.playlistURL) {
      axios
        .get(route.params.playlistURL)
        .then((response) => {
          setParsedData(parse(response.data));
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
          Alert.alert('Error', 'Error loading playlist. Please try again!!!');
        });
    }
  };

  const renderGroupItem = (groupTitle: string) => {
    return (
      <GroupListItem
        groupName={groupTitle}
        onPress={() =>
          navigation.navigate('ChannelList', {
            groupTitle: groupTitle,
            channelList:
              groupTitle === All_CHANNELS_GROUP_NAME
                ? parsedData?.items
                : parsedData?.items.filter(
                    (playlistItem) => playlistItem.group.title === groupTitle
                  ),
          })
        }
      />
    );
  };

  const getListOfUniqueGroups = (): string[] => {
    const uniqueGroups: string[] = [
      ...new Set(
        parsedData?.items
          .filter((playlistItem) => playlistItem.group.title !== '')
          .map((playistItem) => playistItem.group.title)
      ),
    ];
    return uniqueGroups;
  };

  return (
    <SafeAreaView
      style={{
        ...Styles.globalStyles.primaryContainer,
      }}
    >
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <View style={styles.itemListContainer}>
        <FlatList
          data={
            parsedData !== null
              ? [All_CHANNELS_GROUP_NAME, ...getListOfUniqueGroups()].filter(
                  (groupTitle) =>
                    groupTitle.toUpperCase().includes(searchText.toUpperCase())
                )
              : []
          }
          renderItem={({ item }) => renderGroupItem(item)}
          keyExtractor={(groupTitle: string) => groupTitle}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={Styles.globalStyles.activityIndicator}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  itemListContainer: {
    margin: 5,
    maxWidth: 600,
    marginBottom: 30,
  },
});

export default GroupList;
