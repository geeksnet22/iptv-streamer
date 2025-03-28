/** @format */

import { NativeModules, requireNativeComponent } from 'react-native';

const { PlayerModule } = NativeModules;

const PlayerView = requireNativeComponent('RCTPlayerView');

export default {
  PlayerView,
  stop: () => PlayerModule.stop(),
  setVideoPlayerActive: (isVideoPlayerActive) =>
    PlayerModule.setVideoPlayerActive(isVideoPlayerActive),
};
