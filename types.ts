/** @format */

import { Playlist } from 'iptv-playlist-parser';

export type RootStackParamList = {
  ChoosePlaylistType: undefined;
  AddPlaylistCredentials: undefined;
  AddPlaylistURL: undefined;
  GroupList: {
    playlistName: string;
    playlistUrl: string | null;
  };
  ChannelList: {
    playlistName: string;
    groupTitle: string;
  };
  VideoPlayer: {
    uri: string;
  };
  ExistingPlaylists: undefined;
  FavoriteChannels: undefined;
  HomeDrawer: undefined;
};

export type PlaylistData = {
  url: string;
  parsedData: Playlist | null;
};

export interface GroupItem {
  groupTitle: string;
  numberOfChannels: number;
}
