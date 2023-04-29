/** @format */

import { PlaylistItem } from 'iptv-playlist-parser';

export type RootStackParamList = {
  ExistingPlaylists: undefined;
  AddPlaylist: {
    existingPlaylistNames: string[];
  };
  GroupList: {
    playlistName: string;
    playlistURL: string | null;
  };
  ChannelList: {
    groupTitle: string;
    channelList: PlaylistItem[] | undefined;
  };
  VideoPlayer: {
    uri: string;
  };
  FavoriteChannels: undefined;
  HomeDrawer: undefined;
};

export interface GroupItem {
  groupTitle: string;
  numberOfChannels: number;
}
