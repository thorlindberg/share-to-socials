import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';

const handleViewCapture = async nodeToCaptureRef => {
  try {
    console.log('Starting view capture...');
    if (nodeToCaptureRef.current) {
      console.log('Capturing node:', nodeToCaptureRef.current);

      // Capture the specific node using captureRef
      const uri = await new Promise((resolve, reject) => {
        captureRef(nodeToCaptureRef, {
          format: 'jpg',
          quality: 0.9,
        })
          .then(capturedUri => resolve(capturedUri)) // Use a different variable name here
          .catch(error => reject(error));
      });

      console.log('Captured image URI:', uri);

      // Continue with sharing the captured image
      const options = {
        url: uri,
        type: 'image/jpeg',
      };
      await Share.open(options);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Result was saved to Photos',
      });
    }
  } catch (error) {}
};

export default handleViewCapture;
