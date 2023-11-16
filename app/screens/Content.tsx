import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useModal} from 'react-native-modal-provider';
import handleImagePicker from '../handlers/handleImagePicker';
import About from './About';
import {Icon} from '@rneui/themed';
import Menu from '../components/Menu/menu';
import Discover from './Discover';

const placeholder = require('../assets/images/placeholder.jpg');

const Content = () => {
  const {openModal} = useModal();
  const [selectedImage, setSelectedImage] = useState(placeholder);
  const [imagePickerWidth, setImagePickerWidth] = useState(0);
  const [chevronWidth, setChevronWidth] = useState(0);
  const [isBrowsing, setIsBrowsing] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);

  const imageButton = (
    <TouchableOpacity
      onLayout={event => setImagePickerWidth(event.nativeEvent.layout.width)}
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
            <Icon name="plus" type="font-awesome" size={12} color="white" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const mediumButton = (
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
          onLayout={event => setChevronWidth(event.nativeEvent.layout.width)}
          name="chevron-down"
          type="entypo"
          size={16}
          color="#0066FF"
        />
      </View>
    </View>
  );

  const aboutButton = (
    <View style={{width: imagePickerWidth, alignItems: 'flex-end'}}>
      <TouchableOpacity
        onPress={() => {
          openModal({
            node: <About />,
          });
        }}
        style={{gap: 4, justifyContent: 'center'}}>
        <Icon name="info" type="foundation" size={20} color="#0066FF" />
        <Text style={{fontWeight: '600', color: '#0066FF'}}>Info</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Menu
      items={[imageButton, mediumButton, aboutButton]}
      isInset={isScrolled}
      height={height => setMenuHeight(height)}>
      {isBrowsing && ( // should show Editor when isBrowsing is false
        <Discover // should call setBrowsing when opening a Preview
          offsetY={value => {
            if (value > 24) {
              setIsScrolled(true);
            } else {
              setIsScrolled(false);
            }
          }}
          selectedImage={selectedImage}
          menuHeight={menuHeight}
        />
      )}
    </Menu>
  );
};

export default Content;
