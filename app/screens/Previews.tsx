import * as React from 'react';
import {Animated} from 'react-native';

const Previews = ({
  children,
  fullscreenState,
}: {
  children: React.ReactNode;
  fullscreenState: boolean;
}) => {
  const gap = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(gap, {
      toValue: fullscreenState ? 100 : -100, // this should be based on Dimensions and menuHeight
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
