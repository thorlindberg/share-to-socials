import * as React from 'react';
import {Text, Animated, TouchableOpacity, View, Image} from 'react-native';
import useStyle from './styles';
import {TitleBarProps} from './types';
import Rounded from '../Rounded/Rounded';
import {useScroll} from 'react-native-scroll-provider';

const TitleBar = ({
  children,
  backgroundColor,
  cancellationColor,
  cancellationText,
  cancellationAction,
  confirmationColor,
  confirmationText,
  confirmationAction,
  titleColor,
  titleText,
  icon,
  detent,
  scaling,
}: TitleBarProps) => {
  const {getScroll, resetScroll} = useScroll();

  const scrolled = getScroll('divider');
  const opacityDivider = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(opacityDivider, {
      toValue: scrolled ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [opacityDivider, scrolled]);

  const scrolledTitlebar = getScroll('titlebar');
  const opacityTitlebar = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(opacityTitlebar, {
      toValue: scrolledTitlebar ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [opacityTitlebar, scrolledTitlebar]);

  const styles = useStyle(
    backgroundColor,
    cancellationColor,
    confirmationColor,
    titleColor,
    detent,
    opacityTitlebar,
    scaling,
  );

  const animatedView = (
    <Animated.View style={styles.middleStyle}>
      {icon && (
        <Rounded
          radius={4}
          smooth
          style={{
            width: 24,
            height: 24,
          }}>
          <Image
            source={icon}
            style={{
              width: 24,
              height: 24,
            }}
            resizeMode="cover"
          />
        </Rounded>
      )}
      <Text style={styles.titleStyle} numberOfLines={1} ellipsizeMode="tail">
        {titleText}
      </Text>
    </Animated.View>
  );

  return (
    <View style={styles.containerStyle}>
      <View style={styles.titleBarStyle}>
        {cancellationText && cancellationAction && (
          <TouchableOpacity
            onPress={() => {
              cancellationAction();
              resetScroll();
            }}>
            <Text style={styles.cancellationStyle}>{cancellationText}</Text>
          </TouchableOpacity>
        )}
        {animatedView}
        {confirmationText && (
          <TouchableOpacity onPress={confirmationAction}>
            <Text style={styles.confirmationStyle}>{confirmationText}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Animated.View
        style={{...styles.dividerStyle, opacity: opacityDivider}}
      />
      {children}
    </View>
  );
};

export default TitleBar;
