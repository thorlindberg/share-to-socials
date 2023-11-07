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
  const ratio = (1 / screenHeight) * (screenHeight - 2 * menuHeight);
  const calculated = screenWidth - screenWidth * ratio;

  const gap = React.useRef(new Animated.Value(-calculated)).current;
  React.useEffect(() => {
    Animated.timing(gap, {
      toValue: fullscreenState ? calculated : -calculated + calculated / 4,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [calculated, fullscreenState, gap]);

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
