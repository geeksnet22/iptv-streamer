/** @format */

import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoPlayer from './components/VideoPlayer';
import AddPlaylist from './components/AddPlaylist';
import GroupList from './components/GroupList';
import ChannelList from './components/ChannelList';
import { RootStackParamList } from './types';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import HomeDrawer from './components/HomeDrawer';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';

const App = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={persistor}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <RootStack.Navigator>
              <RootStack.Screen
                name="HomeDrawer"
                component={HomeDrawer}
                options={{ headerShown: false, title: 'Home' }}
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
      </PersistGate>
    </Provider>
  );
};

export default App;
