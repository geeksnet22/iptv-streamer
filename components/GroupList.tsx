/** @format */

import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Alert, FlatList } from 'react-native';
import SearchBar from './SearchBar';
import GroupListItem from './GroupListItem';
import axios, { AxiosResponse } from 'axios';
import { parse, Playlist, PlaylistItem } from 'iptv-playlist-parser';
import { ActivityIndicator } from 'react-native';
import { Styles } from '../styles/Styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GroupItem, RootStackParamList } from '../types';
import * as React from 'react';
import { app } from '../config';
import {
  collection,
  getDocs,
  addDoc,
  initializeFirestore,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'GroupList'>;

const All_CHANNELS_GROUP_NAME = 'All Channels';

const db = initializeFirestore(app, { experimentalForceLongPolling: true });

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
        .then((response: AxiosResponse) => {
          setParsedData(parse(response.data));
          setIsLoading(false);
          addPlayistToDb();
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
          Alert.alert('Error', 'Error loading playlist. Please try again!!!');
        });
    }
  };

  const addPlayistToDb = async () => {
    try {
      const playlistsQuery = query(
        collection(db, 'playlists'),
        where('url', '==', route.params.playlistURL)
      );
      const playlistsQuerySnapshot = await getDocs(playlistsQuery);
      if (playlistsQuerySnapshot.empty) {
        const playlistsDocRef = await addDoc(collection(db, 'playlists'), {
          name: route.params.playlistName,
          url: route.params.playlistURL,
          createdAt: serverTimestamp(),
        });
        console.log(
          'Playlist successfully added with ID: ',
          playlistsDocRef.id
        );
      }
    } catch (error) {
      console.error('Error uploading playlist: ', error);
    }
  };

  const renderGroupItem = (groupTitle: string, numberOfChannels: number) => {
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
        numberOfChannels={numberOfChannels}
      />
    );
  };

  const getListOfGroupsAndNumberOfChannels = (): GroupItem[] => {
    if (parsedData === null || parsedData?.items === undefined) return [];
    const uniqueGroupsWithNumberOfChannels: Map<string, number> = new Map();
    uniqueGroupsWithNumberOfChannels.set(
      All_CHANNELS_GROUP_NAME,
      parsedData.items.length
    );
    for (const playlistItem of parsedData.items) {
      if (playlistItem.group.title === '') continue;
      if (uniqueGroupsWithNumberOfChannels.has(playlistItem.group.title)) {
        uniqueGroupsWithNumberOfChannels.set(
          playlistItem.group.title,
          uniqueGroupsWithNumberOfChannels.get(playlistItem.group.title) + 1
        );
      } else {
        uniqueGroupsWithNumberOfChannels.set(playlistItem.group.title, 1);
      }
    }
    const groupsAndNumberOfChannels: GroupItem[] = [];
    for (const [key, value] of uniqueGroupsWithNumberOfChannels) {
      groupsAndNumberOfChannels.push({
        groupTitle: key,
        numberOfChannels: value,
      });
    }
    return groupsAndNumberOfChannels;
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
          data={getListOfGroupsAndNumberOfChannels().filter((group) =>
            group.groupTitle.toUpperCase().includes(searchText.toUpperCase())
          )}
          renderItem={({ item: { groupTitle, numberOfChannels } }) =>
            renderGroupItem(groupTitle, numberOfChannels)
          }
          keyExtractor={({ groupTitle }) => groupTitle}
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
