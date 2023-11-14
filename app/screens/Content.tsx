import React, {useState} from 'react';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import data from '../assets/json/presets.json';
import About from './About';
import Item from './Item';
import Rounded from '../components/Rounded/Rounded';
import {BlurView} from '@react-native-community/blur';
import {Icon} from '@rneui/themed';

const placeholder = require('../assets/images/placeholder.jpg');

const Content = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const {openModal} = useModal();
  const [selectedImage, setSelectedImage] = useState(placeholder);

  const [imagePickerWidth, setImagePickerWidth] = useState(0);
  const [chevronWidth, setChevronWidth] = useState(0);

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

  const scrollViewRef = React.useRef<ScrollView | null>(null);

  const paddingBottom = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(paddingBottom, {
      toValue: isScrolled ? 0 : 24,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isScrolled, paddingBottom]);

  const paddingVertical = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(paddingVertical, {
      toValue: isScrolled ? 12 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isScrolled, paddingVertical]);

  const shadowOpacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(shadowOpacity, {
      toValue: isScrolled ? 0.15 : 0,
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
        }}>
        <View
          style={{
            paddingTop: viewHeight + 8,
          }}>
          {Object.entries(data).map(([category, items]) => (
            <View key={category} style={{gap: 16}}>
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
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
        }}
        onLayout={event => setViewHeight(event.nativeEvent.layout.height)}>
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
                  backgroundColor: isScrolled
                    ? 'rgba(235, 235, 235, 0.8)'
                    : 'rgb(235, 235, 235)',
                  paddingVertical: paddingVertical,
                  paddingLeft: 12,
                  paddingRight: 24,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onLayout={event =>
                    setImagePickerWidth(event.nativeEvent.layout.width)
                  }
                  onPress={() => {
                    handleImagePicker(image => {
                      setSelectedImage(image);
                    });
                  }}>
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 1000,
                      borderWidth: 1,
                      borderColor: 'rgb(220, 220, 220)',
                      backgroundColor: 'white',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={selectedImage}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 1000,
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        borderWidth: 1,
                        borderRadius: 1000,
                        borderColor: 'rgb(220, 220, 220)',
                        backgroundColor: 'white',
                        width: 24,
                        height: 24,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: '#0066FF',
                          borderRadius: 1000,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="plus"
                          type="font-awesome"
                          size={12}
                          color="white"
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{alignItems: 'center', gap: 4}}>
                  <Text>Share to</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 4,
                      paddingLeft: chevronWidth + 4,
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        color: '#0066FF',
                      }}>
                      Instagram
                    </Text>
                    <Icon
                      onLayout={event =>
                        setChevronWidth(event.nativeEvent.layout.width)
                      }
                      name="chevron-down"
                      type="entypo"
                      size={16}
                      color="#0066FF"
                    />
                  </View>
                </View>
                <View style={{width: imagePickerWidth, alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => {
                      openModal({
                        node: <About />,
                      });
                    }}
                    style={{gap: 4, justifyContent: 'center'}}>
                    <Icon
                      name="info"
                      type="foundation"
                      size={20}
                      color="#0066FF"
                    />
                    <Text style={{fontWeight: '600', color: '#0066FF'}}>
                      Info
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </BlurView>
          </Rounded>
        </Animated.View>
      </View>
    </View>
  );
};

export default Content;
