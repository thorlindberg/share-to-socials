import React, {useState, useRef} from 'react';
import {Dimensions, Animated, View} from 'react-native';
import Editor from './Editor';
import Browse from './Browse';
import Preview from './Preview';

const placeholder = require('../assets/images/placeholder.jpg');

const Content = () => {
  const nodeToCaptureRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(placeholder);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const translateContent = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(translateContent, {
      toValue: isPreviewing
        ? -Dimensions.get('window').width * 2 - 1
        : selectedItem
        ? -Dimensions.get('window').width - 1
        : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [translateContent, selectedItem, isPreviewing]);

  const opacityPreview = React.useRef(
    new Animated.Value(-Dimensions.get('window').width * 0.1),
  ).current;
  React.useEffect(() => {
    Animated.timing(opacityPreview, {
      toValue: isPreviewing ? 1 : 0.25,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [opacityPreview, isPreviewing]);

  const translatePreview = React.useRef(
    new Animated.Value(-Dimensions.get('window').width * 0.1),
  ).current;
  React.useEffect(() => {
    Animated.timing(translatePreview, {
      toValue: isPreviewing ? 0 : Dimensions.get('window').width * 0.25,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [translatePreview, isPreviewing]);

  return (
    <View style={{height: '100%', width: '100%'}}>
      <Animated.View
        style={{
          height: '100%',
          width: '100%',
          opacity: opacityPreview,
          transform: [{translateX: translatePreview}],
        }}>
        <Preview
          nodeToCaptureRef={nodeToCaptureRef}
          selectedImage={selectedImage}
          item={selectedItem}
          setIsPreviewing={value => setIsPreviewing(value)}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          flexDirection: 'row',
          transform: [{translateX: translateContent}],
        }}>
        <Browse
          selectedImage={selectedImage}
          setSelectedItem={item => setSelectedItem(item)}
          setSelectedImage={value => setSelectedImage(value)}
        />
        <View style={{width: 1, backgroundColor: 'rgb(200, 200, 200)'}} />
        <Editor
          nodeToCaptureRef={nodeToCaptureRef}
          selectedImage={selectedImage}
          item={
            selectedItem ?? {
              backgroundColor: 'white',
              background: 'Color',
              scale: 1,
              alignment: {
                horizontal: 'center',
                vertical: 'center',
              },
              inset: {
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
              },
              expansion: {
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
              },
              sizing: 'Fit',
            }
          }
          setSelectedItem={item => setSelectedItem(item)}
          setIsPreviewing={value => setIsPreviewing(value)}
        />
      </Animated.View>
    </View>
  );
};

export default Content;
