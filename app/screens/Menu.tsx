import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ImageSourcePropType, Text, View} from 'react-native';
import Button from '../components/Button/button';
import handleImagePicker from '../handlers/handleImagePicker';
import handleColorPicker from '../handlers/handleColorPicker';
import handleViewCapture from '../handlers/handleViewCapture';
import handleNumberSelection from '../handlers/handleNumberSelection';
import useHandleResizingMode from '../handlers/handleResizingMode';
import useHandleAlignment from '../handlers/handleAlignment';

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
  setResizingMode,
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
  paddingValue: string;
  setPaddingValue: (value: string) => void;
  setResizingMode: (value: string) => void;
  setAlignment: (value: string) => void;
}) => {
  const handleResizingMode = useHandleResizingMode();
  const handleAlignment = useHandleAlignment();
  const [isCustomizing, setCustomizing] = React.useState(false);
  const safeAreaInsets = useSafeAreaInsets();

  const socialMediaTitle = (
    <View
      style={{
        gap: 16,
        alignItems: 'center',
        height: menuHeight,
        justifyContent: 'flex-end',
        paddingBottom: safeAreaInsets.top - safeAreaInsets.bottom + 12,
      }}>
      <Text
        style={{fontWeight: '600', color: selectedImage ? 'black' : '#7d7d7d'}}>
        {activeSocial}
      </Text>
    </View>
  );

  const controls = (
    <View
      style={{
        paddingBottom: safeAreaInsets.bottom + 8,
        paddingTop: safeAreaInsets.top - safeAreaInsets.bottom + 12,
        gap: 40,
        alignItems: 'center',
      }}
      onLayout={onMenuLayout}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
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
      {isCustomizing ? (
        <View
          style={{
            flexDirection: 'row',
            gap: 18,
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
            handlePress={() => handleResizingMode(setResizingMode)}
          />
          <Button icon="align-center"
            handlePress={() => handleAlignment(setAlignment)}
          />
          <Button
            handlePress={() => handleNumberSelection(setPaddingValue)}
            text={paddingValue}
          />
          <Button
            handlePress={() => setCustomizing(false)}
            text="Done"
            fill
            fontColor="white"
            backgroundColor="#0066FF"
          />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            gap: 24,
          }}>
          <Button
            handlePress={() => {
              handleImagePicker(image => {
                setSelectedImage(image);
              });
            }}
            icon="image"
          />
          <Button
            disabled={!selectedImage}
            handlePress={() => setCustomizing(true)}
            text="Customize"
            fill
            fontColor="white"
            backgroundColor="#0066FF"
          />
          <Button
            handlePress={() => handleViewCapture(nodeToCaptureRef)}
            disabled={!selectedImage}
            fontColor="#0066FF"
            icon="share"
          />
        </View>
      )}
    </View>
  );

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'space-between',
        gap: 24,
        paddingHorizontal: 24,
      }}>
      {socialMediaTitle}
      {controls}
    </View>
  );
};

export default Menu;
