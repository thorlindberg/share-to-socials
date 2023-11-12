import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ImageSourcePropType,
  ScrollView,
} from 'react-native';
import {useModal} from 'react-native-modal-provider';
import Editor from './Editor';
import handleImagePicker from '../handlers/handleImagePicker';
import TitleBar from '../components/TitleBar/TitleBar';
import Device from './Device';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import data from '../assets/json/presets.json';

const Content = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const {openModal} = useModal();
  const [selectedImage, setSelectedImage] =
    useState<ImageSourcePropType | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (event: {nativeEvent: {contentOffset: {y: number}}}) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const [width, setWidth] = useState(0);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      <TitleBar
        backgroundColor={isScrolled ? 'white' : 'rgb(235, 235, 235)'}
        cancellationColor="#0066FF"
        cancellationText="Image"
        cancellationAction={() => {
          handleImagePicker(image => {
            setSelectedImage(image);
          });
        }}
        confirmationColor="#0066FF"
        confirmationText="About"
        detent="large">
        <View
          style={{
            height: 1,
            backgroundColor: 'rgb(200, 200, 200)',
            opacity: isScrolled ? 1 : 0,
          }}
        />
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{
            backgroundColor: 'rgb(235, 235, 235)',
            paddingHorizontal: 24,
            paddingVertical: 12,
          }}>
          <View
            style={{
              paddingBottom: safeAreaInsets.bottom + 24,
              gap: 24,
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
            onLayout={event => setWidth(event.nativeEvent.layout.width)}>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                disabled={!selectedImage}
                style={{width: (width - 24) / 2}}
                onPress={() => {
                  openModal({
                    node: (
                      <Editor
                        selectedImage={selectedImage}
                        backgroundColor={item.backgroundColor}
                        initialBackground={item.background}
                        initialPadding={item.scale}
                        initialHorizontal={item.alignment.horizontal}
                        initialVertical={item.alignment.vertical}
                        initialInsetLeft={item.inset.left}
                        initialInsetRight={item.inset.right}
                        initialInsetTop={item.inset.top}
                        initialInsetBottom={item.inset.bottom}
                        initialTopExpansion={item.expansion.top}
                        initialBottomExpansion={item.expansion.bottom}
                        initialLeftExpansion={item.expansion.left}
                        initialRightExpansion={item.expansion.right}
                        initialSizing={item.sizing}
                      />
                    ),
                  });
                }}>
                <Device
                  selectedImage={selectedImage}
                  backgroundColor={item.backgroundColor}
                  initialPadding={item.scale}
                  initialHorizontal={item.alignment.horizontal}
                  initialVertical={item.alignment.vertical}
                  initialInsetLeft={item.inset.left}
                  initialInsetRight={item.inset.right}
                  initialInsetTop={item.inset.top}
                  initialInsetBottom={item.inset.bottom}
                  initialTopExpansion={item.expansion.top}
                  initialBottomExpansion={item.expansion.bottom}
                  initialLeftExpansion={item.expansion.left}
                  initialRightExpansion={item.expansion.right}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </TitleBar>
    </View>
  );
};

export default Content;
