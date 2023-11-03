import * as React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';

const Button = ({
  disabled,
  handlePress,
  icon,
  text,
  fill,
  fontColor,
  backgroundColor,
  image,
}: {
  disabled?: boolean;
  handlePress: () => void;
  icon?: string;
  text?: string;
  fill?: boolean;
  fontColor?: string;
  backgroundColor?: string;
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handlePress}
      style={{
        flex: fill ? 1 : 0,
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: disabled
          ? '#E9E9E9'
          : backgroundColor
          ? backgroundColor
          : 'white',
        borderColor: disabled
          ? '#ACACAC'
          : backgroundColor
          ? backgroundColor
          : '#ACACAC',
        borderWidth: 0.5,
        borderRadius: 1000,
      }}>
      {image && (
        <Image
          source={image}
          style={{
            borderRadius: 1000,
            aspectRatio: 1,
            height: 30,
            width: 30,
          }}
        />
      )}
      {icon && (
        <Icon
          name={icon}
          type="feather"
          size={20}
          color={disabled ? '#9D9D9D' : fontColor ? fontColor : 'black'}
        />
      )}
      {text && (
        <Text
          style={{
            color: disabled ? '#9D9D9D' : fontColor ? fontColor : 'black',
            fontWeight: 600,
          }}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
