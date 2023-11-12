import * as React from 'react';
import {Animated, View} from 'react-native';
import useStyle from './styles';
import {TitleBarProps} from './types';
import {useScroll} from 'react-native-scroll-provider';

const TitleBar = ({
  children,
  backgroundColor,
  cancellationNode,
  confirmationNode,
  titleNode,
  detent,
  scaling,
}: TitleBarProps) => {
  const {getScroll} = useScroll();

  const scrolled = getScroll('divider');
  const opacityDivider = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(opacityDivider, {
      toValue: scrolled ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [opacityDivider, scrolled]);

  const styles = useStyle(backgroundColor, detent, scaling);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.titleBarStyle}>
        {cancellationNode}
        {titleNode}
        {confirmationNode}
      </View>
      <Animated.View
        style={{...styles.dividerStyle, opacity: opacityDivider}}
      />
      {children}
    </View>
  );
};

export default TitleBar;
