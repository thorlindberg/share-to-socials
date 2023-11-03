import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';

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
    }
  } catch (error) {
    console.error('Error capturing or sharing image:', error);
  }
};

export default handleViewCapture;
