import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

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

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Image imported from Photos',
      });

      callback(source);
    }
  });
};

export default handleImagePicker;
