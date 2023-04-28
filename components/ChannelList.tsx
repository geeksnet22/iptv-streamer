/** @format */

import * as React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import SearchBar from './SearchBar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native';
import ChannelListItem from './ChannelListItem';
import { Styles } from '../styles/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { PlaylistItem } from 'iptv-playlist-parser';
import { useAppSelector } from '../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'ChannelList'>;

const ChannelList = ({ route, navigation }: Props) => {
  const [searchText, setSearchText] = React.useState('');
  const isFocused = useIsFocused();
  const favoriteChannels = useAppSelector(
    (state) => state.favoriteChannels.value
  );

  React.useEffect(() => {
    if (Platform.OS === 'android' && isFocused) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      ).catch((error) => console.log(error));
    }
  }, [isFocused]);

  const renderItem = React.useCallback(
    (playlistItem: PlaylistItem) => (
      <ChannelListItem
        playlistItem={playlistItem}
        favoriteChannels={favoriteChannels}
        onPress={() =>
          navigation.navigate('VideoPlayer', { uri: playlistItem.url })
        }
      />
    ),
    [favoriteChannels]
  );

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
          data={route.params.channelList?.filter((playlistItem) =>
            playlistItem.name
              .toUpperCase()
              .includes(searchText.trim().toUpperCase())
          )}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.name + item.url}
        />
      </View>
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

export default ChannelList;
