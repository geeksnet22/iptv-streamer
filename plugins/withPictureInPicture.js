/** @format */

const {
  withAndroidManifest,
} = require('@expo/config-plugins/build/plugins/android-plugins.js');

function withPictureInPicture(config) {
  return withAndroidManifest(config, async (config) => {
    const manifest = config.modResults;
    const mainActivity = manifest.manifest.application[0].activity.find(
      (activity) => activity['$']['android:name'] === '.MainActivity'
    );
    if (mainActivity) {
      mainActivity['$']['android:supportsPictureInPicture'] = 'true';
      mainActivity['$']['android:resizeableActivity'] = 'true';
      mainActivity['$']['android:configChanges'] =
        'screenSize|smallestScreenSize|screenLayout|orientation';
    }
    return config;
  });
}

module.exports = withPictureInPicture;
