/** @format */

import { NativeModules, requireNativeComponent } from 'react-native';

const { PlayerModule } = NativeModules;

console.log('PlayerModule', PlayerModule);

const PlayerView = requireNativeComponent('RCTPlayerView');

export default {
  PlayerView,
  stop: () => PlayerModule.stop(),
};
