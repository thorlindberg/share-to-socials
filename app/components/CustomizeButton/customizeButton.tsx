import * as React from 'react';
import {ImageSourcePropType, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomizeButton = ({
  selectedImage,
}: {
  selectedImage: ImageSourcePropType | null;
}) => {
  const handlePress = async () => {
    //
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!selectedImage}
      style={{flex: 1}}>
      <LinearGradient
        colors={selectedImage ? ['#ff7700', '#ff005d'] : ['#E9E9E9', '#E9E9E9']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          borderColor: selectedImage ? '#ff7700' : '#ACACAC',
          borderWidth: 0.5,
          paddingVertical: 12,
          borderRadius: 1000,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: selectedImage ? 'white' : '#7d7d7d',
            fontWeight: '600',
          }}>
          Customize
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomizeButton;
