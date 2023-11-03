import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';

const untoggledURL = require('../../assets/images/iphone.png');
const toggledURL = require('../../assets/images/iphone-slash.png');

const FrameToggle = ({
  fullscreenState,
  framedState,
  setFramedState,
}: {
  fullscreenState: boolean;
  framedState: boolean;
  setFramedState: (color: boolean) => void;
}) => {
  const handlePress = () => {
    setFramedState(!framedState);
  };

  return (
    <TouchableOpacity
      style={{padding: 10}}
      onPress={handlePress}
      disabled={fullscreenState}>
      <Image
        source={framedState ? toggledURL : untoggledURL}
        style={{
          resizeMode: 'contain',
          aspectRatio: 1,
          opacity: 0.5,
          height: 26,
          width: 26,
        }}
      />
    </TouchableOpacity>
  );
};

export default FrameToggle;
