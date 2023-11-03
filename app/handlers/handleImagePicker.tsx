import * as ImagePicker from 'react-native-image-picker';

const handleImagePicker = callback => {
  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  ImagePicker.launchImageLibrary(options, response => {
    if (response.assets && response.assets.length > 0) {
      const source = {uri: response.assets[0].uri};
      callback(source);
    }
  });
};

export default handleImagePicker;
