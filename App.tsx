/** @format */

import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoPlayer from './components/VideoPlayer';
import AddPlaylistURL from './components/AddPlaylistURL';
import GroupList from './components/GroupList';
import ChannelList from './components/ChannelList';
import { RootStackParamList } from './types';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import HomeDrawer from './components/HomeDrawer';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import ChoosePlaylistType from './components/ChoosePlaylistType';
import AddPlaylistCredentials from './components/AddPlaylistCredentials';

const App = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        StatusBar.setHidden(false);
      }, 1000);
    };

    prepare();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={persistor}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <StatusBar hidden={true} />
            <RootStack.Navigator>
              <RootStack.Screen
                name="HomeDrawer"
                component={HomeDrawer}
                options={{ headerShown: false, title: 'PlayLists' }}
              />
              <RootStack.Screen
                name="ChoosePlaylistType"
                component={ChoosePlaylistType}
                options={{ title: 'Choose Playlist Type' }}
              />
              <RootStack.Screen
                name="AddPlaylistCredentials"
                component={AddPlaylistCredentials}
                options={{ title: 'New Playlist' }}
              />
              <RootStack.Screen
                name="AddPlaylistURL"
                component={AddPlaylistURL}
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
