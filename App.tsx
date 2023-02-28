/** @format */

import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoPlayer from './components/VideoPlayer';
import AddPlaylist from './components/AddPlaylist';
import ExistingPlaylists from './components/ExistingPlaylists';
import GroupList from './components/GroupList';
import ChannelList from './components/ChannelList';
import { RootStackParamList } from './types';

const App = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="ExistingPlaylists"
            component={ExistingPlaylists}
            options={{ title: 'Playlists' }}
          />
          <RootStack.Screen
            name="AddPlaylist"
            component={AddPlaylist}
            options={{ title: 'New Playlist' }}
          />
          <RootStack.Screen
            name="GroupList"
            component={GroupList}
            options={({ route }) => ({ title: route.params.playlistName })}
          />
          <RootStack.Screen
            name="ChannelList"
            component={ChannelList}
            options={({ route }) => ({ title: route.params.groupTitle })}
          />
          <RootStack.Screen
            name="VideoPlayer"
            component={VideoPlayer}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
