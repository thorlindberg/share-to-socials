import * as React from 'react';
import {Animated, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Rounded from '../Rounded/Rounded';
import {BlurView} from '@react-native-community/blur';

const Menu = ({
  children,
  items,
  isInset,
  height,
}: {
  children: React.ReactNode;
  items: [React.ReactNode];
  isInset: boolean;
  height?: (height: number) => void;
}) => {
  const safeAreaInsets = useSafeAreaInsets();

  const paddingBottom = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(paddingBottom, {
      toValue: isInset ? 0 : 24,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isInset, paddingBottom]);

  const paddingVertical = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(paddingVertical, {
      toValue: isInset ? 12 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isInset, paddingVertical]);

  const shadowOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(shadowOpacity, {
      toValue: isInset ? 0.15 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isInset, shadowOpacity]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      {children}
      <View
        style={{
          position: 'absolute',
          width: '100%',
        }}
        onLayout={event => {
          if (height) {
            height(event.nativeEvent.layout.height);
          }
        }}>
        <LinearGradient
          colors={[
            'rgba(235, 235, 235, 1)',
            'rgba(235, 235, 235, 0.8)',
            'rgba(255, 255, 255, 0)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{height: safeAreaInsets.top}}
        />
        <Animated.View
          style={{
            paddingHorizontal: 12,
            paddingBottom: paddingBottom,
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 12},
            shadowOpacity: shadowOpacity,
            shadowRadius: 12,
            overflow: 'visible',
          }}>
          <Rounded smooth radius={28}>
            <BlurView blurType={'light'} blurAmount={12}>
              <Animated.View
                style={{
                  backgroundColor: isInset
                    ? 'rgba(235, 235, 235, 0.8)'
                    : 'rgb(235, 235, 235)',
                  paddingVertical: paddingVertical,
                  paddingLeft: 12,
                  paddingRight: 24,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {items.map(item => item)}
              </Animated.View>
            </BlurView>
          </Rounded>
        </Animated.View>
      </View>
    </View>
  );
};

export default Menu;
