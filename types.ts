/** @format */

import { Playlist, PlaylistItem } from 'iptv-playlist-parser';

export type RootStackParamList = {
  AddPlaylist: {
    existingPlaylistNames: string[];
  };
  GroupList: {
    playlistName: string;
    playlistUrl: string | null;
  };
  ChannelList: {
    groupTitle: string;
    channelList: PlaylistItem[] | undefined;
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
