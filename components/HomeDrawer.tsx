/** @format */

import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import ExistingPlaylists from './ExistingPlaylists';
import FavoriteChannels from './FavoriteChannels';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { StyleSheet, Text } from 'react-native';
import { Styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeDrawer'>;

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: Props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text
        style={{
          ...Styles.globalStyles.headerText,
          ...styles.headerText,
        }}
      >
        Menu
      </Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const HomeDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      drawerStyle: styles.container,
      drawerLabelStyle: Styles.globalStyles.basicText,
      drawerActiveBackgroundColor: '#318CE7',
    }}
  >
    <Drawer.Screen
      name="Playlists"
      component={ExistingPlaylists}
    />
    <Drawer.Screen
      name="Favorites"
      component={FavoriteChannels}
    />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0066b1',
  },
  headerText: {
    fontSize: 25,
    alignSelf: 'center',
    padding: 10,
  },
});

export default HomeDrawer;
