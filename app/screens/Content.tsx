import React, {useState, useEffect} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import {useModal} from 'react-native-modal-provider';
import handleImagePicker from '../handlers/handleImagePicker';
import TitleBar from '../components/TitleBar/TitleBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import data from '../assets/json/presets.json';
import About from './About';
import Item from './Item';
import Rounded from '../components/Rounded/Rounded';
import {BlurView} from '@react-native-community/blur';

const placeholder = require('../assets/images/placeholder.webp');

const Content = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const {openModal} = useModal();
  const [selectedImage, setSelectedImage] = useState(placeholder);

  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (event: {nativeEvent: {contentOffset: {y: number}}}) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 24) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const [width, setWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  const handleViewLayout = (event: {
    nativeEvent: {layout: {height: number}};
  }) => {
    const height = event.nativeEvent.layout.height;
    setViewHeight(height);
  };

  const scrollViewRef = React.useRef<ScrollView | null>(null);

  const paddingBottom = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(paddingBottom, {
      toValue: isScrolled ? 0 : 48,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isScrolled, paddingBottom]);

  const paddingVertical = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(paddingVertical, {
      toValue: isScrolled ? 24 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isScrolled, paddingVertical]);

  const paddingHorizontal = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(paddingHorizontal, {
      toValue: isScrolled ? 24 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isScrolled, paddingHorizontal]);

  const shadowOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(shadowOpacity, {
      toValue: isScrolled ? 0.25 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isScrolled, shadowOpacity]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
          backgroundColor: 'rgb(235, 235, 235)',
          paddingTop: viewHeight,
        }}>
        {Object.entries(data).map(([category, items]) => (
          <View key={category} style={{gap: 24}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                paddingHorizontal: 24,
              }}>
              {category}
            </Text>
            <ScrollView
              horizontal
              onLayout={event => setWidth(event.nativeEvent.layout.width)}
              showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  paddingHorizontal: 24,
                  paddingBottom: safeAreaInsets.bottom
                    ? safeAreaInsets.bottom + 12
                    : 24,
                  gap: 24,
                  flexDirection: 'row',
                }}>
                {items.map((item, index) => (
                  <Item
                    key={index}
                    width={width}
                    selectedImage={selectedImage}
                    item={item}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
        }}
        onLayout={handleViewLayout}>
        <LinearGradient
          colors={[
            'rgb(235, 235, 235)',
            'rgb(235, 235, 235)',
            'rgba(255, 255, 255, 0)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{height: safeAreaInsets.top}}
        />
        <Animated.View
          style={{
            paddingHorizontal: 24,
            paddingTop: 12,
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
                  backgroundColor: isScrolled
                    ? 'rgba(235, 235, 235, 0.8)'
                    : 'rgb(235, 235, 235)',
                  paddingVertical: paddingVertical,
                  paddingHorizontal: paddingHorizontal,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleImagePicker(image => {
                      setSelectedImage(image);
                    });
                  }}>
                  <View
                    style={{
                      width: 42,
                      height: 28,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: 'rgb(220, 220, 220)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: isScrolled
                        ? 'white'
                        : 'rgb(235, 235, 235)',
                    }}>
                    <View
                      style={{
                        width: 34,
                        height: 20,
                        borderRadius: 2,
                      }}
                    />
                    {selectedImage && (
                      <Image
                        source={selectedImage}
                        style={{
                          width: 34,
                          height: 20,
                          borderRadius: 2,
                          resizeMode: 'cover',
                          position: 'absolute',
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    fontWeight: '600',
                  }}>
                  Instagram Story
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    openModal({
                      node: <About />,
                    });
                  }}>
                  <Text style={{fontWeight: '600', color: '#0066FF'}}>
                    About
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </BlurView>
          </Rounded>
        </Animated.View>
      </View>
    </View>
  );
};

export default Content;
