import * as React from 'react';
import {Animated, Dimensions} from 'react-native';

const Previews = ({
  children,
  fullscreenState,
  menuHeight,
}: {
  children: React.ReactNode;
  fullscreenState: boolean;
  menuHeight: number;
}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const ratio = (screenHeight - menuHeight * 2) / screenHeight;
  const calculated = ratio * screenWidth - 128; // verify this to be correct

  const gap = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(gap, {
      toValue: fullscreenState ? calculated : -calculated,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [fullscreenState, gap]);

  return (
    <Animated.View
      style={{
        flex: 1,
        gap: gap,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        pointerEvents: 'box-none',
      }}>
      {children}
    </Animated.View>
  );
};

export default Previews;
