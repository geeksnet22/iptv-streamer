/** @format */

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GroupItem, RootStackParamList } from '../types';
import GroupListItem from './GroupListItem';
import { Styles } from '../styles/styles';
import SearchBar from './SearchBar';
import { parse, Playlist } from 'iptv-playlist-parser';
import useMemoizedFilter from '../hooks/useMemoizedFilter';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setPlaylist } from '../redux/slices/savedPlaylistsSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'GroupList'>;

const All_CHANNELS_GROUP_NAME = 'All Channels';

const GroupList = ({ navigation, route }: Props) => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const parsedData = useAppSelector(
    (state) => state.savedPlaylists[route.params.playlistName]?.parsedData
  );

  useEffect(() => {
    if (!parsedData) {
      fetchAndSetPlaylistsData();
    } else {
      setIsLoading(false);
    }
  }, [parsedData]);

  const fetchAndSetPlaylistsData = async () => {
    try {
      if (route.params.playlistUrl) {
        const response = await axios.get(route.params.playlistUrl, {
          headers: {
            'Accept-Encoding': 'gzip, deflate',
          },
        });
        const playList: Playlist = parse(response.data);
        try {
          dispatch(
            setPlaylist({
              playlistName: route.params.playlistName,
              playlistData: {
                url: route.params.playlistUrl,
                parsedData: playList,
              },
            })
          );
        } catch (storageError) {
          console.error(
            'Failed to save data to Redux/AsyncStorage:',
            storageError
          );
        }
        setIsLoading(false);
        setIsLoading(false);
      }
    } catch (e) {
      console.log('Error loading playlist: ' + e);
      setIsLoading(false);
      Alert.alert('Error', 'Error loading playlist. Please try again!!!');
    }
  };

  const renderGroupItem = (groupTitle: string, numberOfChannels: number) => {
    return (
      <GroupListItem
        groupName={groupTitle}
        onPress={() =>
          navigation.navigate('ChannelList', {
            playlistName: route.params.playlistName,
            groupTitle: groupTitle,
          })
        }
        numberOfChannels={numberOfChannels}
      />
    );
  };

  const getListOfGroupsAndNumberOfChannels = useCallback((): GroupItem[] => {
    if (!parsedData || !parsedData.items) return [];

    const uniqueGroupsWithNumberOfChannels: Record<string, number> = {
      [All_CHANNELS_GROUP_NAME]: parsedData.items.length,
    };

    parsedData.items.forEach((item) => {
      const groupTitle = item.group.title;
      if (groupTitle) {
        if (uniqueGroupsWithNumberOfChannels[groupTitle]) {
          uniqueGroupsWithNumberOfChannels[groupTitle]++;
        } else {
          uniqueGroupsWithNumberOfChannels[groupTitle] = 1;
        }
      }
    });

    return Object.entries(uniqueGroupsWithNumberOfChannels).map(
      ([groupTitle, numberOfChannels]) => ({
        groupTitle,
        numberOfChannels,
      })
    );
  }, [parsedData]);

  const filteredGroups = useMemoizedFilter(
    getListOfGroupsAndNumberOfChannels(),
    searchText,
    'groupTitle'
  );

  return (
    <SafeAreaView style={Styles.globalStyles.primaryContainer}>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <View style={styles.itemListContainer}>
        <FlatList
          data={filteredGroups}
          renderItem={({ item: { groupTitle, numberOfChannels } }) =>
            renderGroupItem(groupTitle, numberOfChannels)
          }
          keyExtractor={({ groupTitle }) => groupTitle}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </View>
      {isLoading && (
        <ActivityIndicator
          size="large"
          style={Styles.globalStyles.activityIndicator}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemListContainer: {
    flex: 1,
  },
});

export default GroupList;
