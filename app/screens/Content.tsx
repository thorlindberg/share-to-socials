import React, {useRef, useState} from 'react';
import {
  ImageSourcePropType,
  LayoutChangeEvent,
  StatusBar,
  View,
} from 'react-native';
import Previews from './Previews';
import Menu from './Menu';
import Preview from '../components/Preview/preview';

const Content = () => {
  const socials = ['TWITTER POST', 'INSTAGRAM STORY', 'FACEBOOK'];
  const [activeSocial] = React.useState('INSTAGRAM STORY');
  const [colorSelection, setColorSelection] = React.useState('white');
  const [fullscreenState, setFullscreenState] = React.useState(false);
  const [menuHeight, setMenuHeight] = React.useState(0);
  const [selectedVerticalAlignment] = React.useState('center');
  const [selectedHorizontalAlignment] = React.useState('center');
  const [paddingValue, setPaddingValue] = React.useState('90');
  const [selectedImage, setSelectedImage] =
    useState<ImageSourcePropType | null>(null);

  const handleMenuLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    setMenuHeight(height);
  };

  const nodeToCaptureRef = useRef(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <StatusBar
        animated
        barStyle={fullscreenState ? 'light-content' : 'dark-content'}
      />
      <Menu
        activeSocial={activeSocial}
        onMenuLayout={handleMenuLayout}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        nodeToCaptureRef={nodeToCaptureRef}
        menuHeight={menuHeight}
        setColorSelection={setColorSelection}
        colorSelection={colorSelection}
        paddingValue={paddingValue}
        setPaddingValue={setPaddingValue}
      />
      <Previews>
        {socials.map((name, index) => (
          <Preview
            key={index}
            colorSelection={colorSelection}
            setFullscreenState={setFullscreenState}
            fullscreenState={fullscreenState}
            menuHeight={menuHeight}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            selectedVerticalAlignment={selectedVerticalAlignment}
            selectedHorizontalAlignment={selectedHorizontalAlignment}
            paddingValue={paddingValue}
            nodeToCaptureRef={nodeToCaptureRef}
          />
        ))}
      </Previews>
    </View>
  );
};

export default Content;
