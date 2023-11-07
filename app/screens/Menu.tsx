import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ImageSourcePropType,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Button from '../components/Button/button';
import handleImagePicker from '../handlers/handleImagePicker';
import handleColorPicker from '../handlers/handleColorPicker';
import handleViewCapture from '../handlers/handleViewCapture';
import handleNumberSelection from '../handlers/handleNumberSelection';
import handleResizingMode from '../handlers/handleResizingMode';
import useHandleAlignment from '../handlers/handleAlignment';
import {BlurView} from '@react-native-community/blur';
import Slider from '@react-native-community/slider';
import {Icon} from '@rneui/themed';

const rainbowURL = require('../assets/images/rainbow.png');

const Menu = ({
  activeSocial,
  onMenuLayout,
  selectedImage,
  setSelectedImage,
  nodeToCaptureRef,
  menuHeight,
  setColorSelection,
  colorSelection,
  paddingValue,
  setPaddingValue,
  resizingMode,
  setResizingMode,
  alignment,
  setAlignment,
}: {
  activeSocial: string;
  onMenuLayout: (event: any) => void;
  selectedImage: ImageSourcePropType | null;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<ImageSourcePropType | null>
  >;
  nodeToCaptureRef: React.RefObject<View>;
  menuHeight: number;
  setColorSelection: (color: string) => void;
  colorSelection: string;
  paddingValue: number;
  setPaddingValue: (value: number) => void;
  resizingMode: string;
  setResizingMode: (value: string) => void;
  alignment: string;
  setAlignment: (value: string) => void;
}) => {
  const [isCustomizing, setIsCustomizing] = React.useState(false);

  const handleAlignment = useHandleAlignment();
  const safeAreaInsets = useSafeAreaInsets();

  const socialMediaTitle = (
    <View
      style={{
        gap: 16,
        alignItems: 'center',
        height: menuHeight,
        justifyContent: 'space-between',
        paddingBottom: safeAreaInsets.top - safeAreaInsets.bottom,
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          paddingTop: safeAreaInsets.top ? safeAreaInsets.top + 8 : 24,
        }}>
        {selectedImage && (
          <>
            <TouchableOpacity
              onPress={() => {
                handleImagePicker(image => {
                  setSelectedImage(image);
                });
              }}>
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  backgroundColor: 'rgb(230, 230, 230)',
                  borderRadius: 1000,
                }}>
                <Text style={{color: 'black', fontSize: 12, fontWeight: '600'}}>
                  Image
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleViewCapture(nodeToCaptureRef)}>
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  backgroundColor: '#0066FF',
                  borderRadius: 1000,
                }}>
                <Text style={{color: 'white', fontSize: 12, fontWeight: '600'}}>
                  Share
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Text
        style={{fontWeight: '600', color: selectedImage ? 'black' : '#7d7d7d'}}>
        {activeSocial}
      </Text>
    </View>
  );

  const indicators = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingBottom: 20,
      }}>
      {[0, 1, 2, 3, 4].map((_, index) => (
        <View
          key={index}
          style={{
            width: index === 1 ? 8 : 6,
            height: index === 1 ? 8 : 6,
            backgroundColor: index === 1 ? '#7d7d7d' : '#ACACAC',
            borderRadius: 1000,
          }}
        />
      ))}
    </View>
  );

  const opacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: isCustomizing ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isCustomizing, opacity]);

  const scale = React.useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    Animated.timing(scale, {
      toValue: isCustomizing ? 1 : 1.2,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isCustomizing, scale]);

  const opacity2 = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(opacity2, {
      toValue: selectedImage ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isCustomizing, opacity2, selectedImage]);

  const scale2 = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(scale2, {
      toValue: !selectedImage ? 0 : isCustomizing ? 0.8 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isCustomizing, scale2, selectedImage]);

  const controls = (
    <View
      style={{
        paddingTop: safeAreaInsets.top - safeAreaInsets.bottom + 8,
        alignItems: 'center',
      }}
      onLayout={onMenuLayout}>
      {indicators}
      <View style={{width: '100%'}}>
        <Animated.View // should be a scrollview so any amount of controls can be added
          style={{
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 18,
            paddingBottom: safeAreaInsets.bottom
              ? safeAreaInsets.bottom + 8
              : 24,
            paddingTop: 20,
            paddingHorizontal: 24,
            opacity: opacity2,
            transform: [{scaleX: scale2}, {scaleY: scale2}],
          }}>
          <Button
            handlePress={() => {
              handleColorPicker(colorSelection, color => {
                setColorSelection(color);
              });
            }}
            image={rainbowURL}
          />
          <Button
            icon="maximize-2"
            fontColor="#0066FF"
            handlePress={() => {
              setIsCustomizing(true);
            }}
            text={paddingValue.toFixed(2)}
          />
          <Button
            icon="align-center"
            fontColor="#0066FF"
            handlePress={() => {
              setIsCustomizing(true);
            }}
          />
          <Button
            icon="align-center"
            fontColor="#0066FF"
            handlePress={() => {
              setIsCustomizing(true);
            }}
          />
        </Animated.View>
        <Animated.View
          style={{
            width: '100%',
            position: 'absolute',
            pointerEvents: isCustomizing ? 'auto' : 'none',
            opacity: opacity,
            transform: [{scaleX: scale}, {scaleY: scale}],
          }}>
          <BlurView
            style={{
              paddingBottom: safeAreaInsets.bottom
                ? safeAreaInsets.bottom + 8
                : 24,
              paddingTop: 20,
              paddingHorizontal: 24,
              flexDirection: 'row',
              gap: 18,
              alignItems: 'center',
            }}
            blurType="light"
            blurAmount={10}>
            <View style={{width: 42}}>
              <TouchableOpacity
                onPress={() => setIsCustomizing(false)}
                style={{
                  height: 24,
                  width: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ACACAC',
                  borderRadius: 1000,
                }}>
                <Icon name="x" type="feather" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Slider
              style={{flex: 1}}
              minimumValue={0}
              maximumValue={3} // should be calculated based on image and container width/height depending on image aspectratio
              value={paddingValue}
              onValueChange={setPaddingValue}
              minimumTrackTintColor="#0066FF"
              maximumTrackTintColor="#000000"
            />
            <View
              style={{
                width: 42,
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: '#0066FF',
                  fontWeight: 600,
                }}>
                {paddingValue.toFixed(2)}
              </Text>
            </View>
          </BlurView>
        </Animated.View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'space-between',
      }}>
      {socialMediaTitle}
      {controls}
    </View>
  );
};

export default Menu;
