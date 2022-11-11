import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GroupsList from "./components/GroupsList";
import ChannelsList from "./components/ChannelsList";
import VideoPlayer from "./components/VideoPlayer";
import AddPlaylist from "./components/AddPlaylist";
import CurrentPlaylists from "./components/CurrentPlaylists";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CurrentPlaylists"
          component={CurrentPlaylists}
          options={{ title: "Playlists" }}
        />
        <Stack.Screen
          name="AddPlaylist"
          component={AddPlaylist}
          options={{ title: "New Playlist" }}
        />
        <Stack.Screen
          name="GroupsList"
          component={GroupsList}
          options={({ route }) => ({ title: route.params.playlistName })}
        />
        <Stack.Screen
          name="ChannelsList"
          component={ChannelsList}
          options={({ route }) => ({ title: route.params.groupName })}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
