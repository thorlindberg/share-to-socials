import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ImageSourcePropType,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import {useModal} from 'react-native-modal-provider';
import Editor from './Editor';
import handleImagePicker from '../handlers/handleImagePicker';
import TitleBar from '../components/TitleBar/TitleBar';
import Device from '../components/Device/device';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import data from '../assets/json/presets.json';
import About from './About';

const placeholder = require('../assets/images/placeholder.webp');

const Content = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const {openModal} = useModal();
  const [selectedImage, setSelectedImage] = useState(placeholder);

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
        cancellationNode={
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
                backgroundColor: isScrolled ? 'white' : 'rgb(235, 235, 235)',
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
        }
        titleNode={<Text style={{fontWeight: '600'}}>Instagram Story</Text>} // this should be a dropdown in the future
        confirmationNode={
          <TouchableOpacity
            onPress={() => {
              openModal({
                node: <About />,
              });
            }}>
            <Text style={{fontWeight: '600', color: '#0066FF'}}>About</Text>
          </TouchableOpacity>
        }
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
          }}>
          <View
            style={{
              paddingBottom: safeAreaInsets.bottom
                ? safeAreaInsets.bottom + 12
                : 24,
              gap: 24,
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
            onLayout={event => setWidth(event.nativeEvent.layout.width)}>
            {data.map((item, index) => (
              <View
                key={index}
                style={{
                  width: (width - 24) / 2,
                }}>
                <View>
                  <TouchableOpacity
                    disabled={!selectedImage}
                    style={{
                      backgroundColor: 'white',
                      width: '100%',
                      padding: 24,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      borderLeftWidth: 1,
                      borderTopWidth: 1,
                      borderRightWidth: 1,
                      borderColor: 'rgb(220, 220, 220)',
                    }}
                    onPress={() => {
                      openModal({
                        node: (
                          <Editor
                            initialImage={selectedImage}
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
                      background={item.background}
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
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 24,
                    paddingVertical: 8,
                    gap: 24,
                    backgroundColor: '#0066FF',
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      paddingVertical: 4,
                      paddingHorizontal: 12,
                      color: 'white',
                      fontWeight: '600',
                    }}>
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </TitleBar>
    </View>
  );
};

export default Content;
