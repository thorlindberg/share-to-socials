import * as React from 'react';
import RoundedProps from './types';
import Squircle from 'react-native-squircle';
import MaskedView from '@react-native-masked-view/masked-view';
import {View} from 'react-native';

const Rounded = ({
  children,
  style,
  radius,
  smooth = false,
  borderWidth,
  borderColor,
}: RoundedProps) => {
  return smooth ? (
    borderWidth && borderColor ? (
      <Squircle
        borderRadius={radius - borderWidth * 2}
        backgroundColor={borderColor}
        style={[style]}>
        <MaskedView
          style={[style, {padding: borderWidth}]}
          maskElement={<Squircle borderRadius={radius} />}>
          {children}
        </MaskedView>
      </Squircle>
    ) : (
      <MaskedView
        style={[style, {padding: borderWidth}]}
        maskElement={<Squircle borderRadius={radius} />}>
        {children}
      </MaskedView>
    )
  ) : (
    <View style={{borderRadius: radius}}>{children}</View>
  );
};

export default Rounded;
