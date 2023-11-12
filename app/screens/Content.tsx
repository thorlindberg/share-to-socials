import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView, Text, Image} from 'react-native';
import {useModal} from 'react-native-modal-provider';
import handleImagePicker from '../handlers/handleImagePicker';
import TitleBar from '../components/TitleBar/TitleBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import data from '../assets/json/presets.json';
import About from './About';
import Item from './Item';

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
              <Item width={width} selectedImage={selectedImage} item={item} />
            ))}
          </View>
        </ScrollView>
      </TitleBar>
    </View>
  );
};

export default Content;
