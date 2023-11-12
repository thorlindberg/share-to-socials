import React, {useRef} from 'react';
import Device from '../components/Device/device';
import handleViewCapture from '../handlers/handleViewCapture';
import {Text, TouchableOpacity, View} from 'react-native';
import Editor from './Editor';
import {useModal} from 'react-native-modal-provider';

const Item = ({width, selectedImage, item}) => {
  const {openModal} = useModal();
  const nodeToCaptureRef = useRef(null);

  return (
    <View
      style={{
        width: (width - 24) / 2,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 24,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderLeftWidth: 1,
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderColor: 'rgb(220, 220, 220)',
        }}>
        <TouchableOpacity
          disabled={!selectedImage}
          style={{
            width: '100%',
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
            nodeToCaptureRef={nodeToCaptureRef}
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
        onPress={() => handleViewCapture(nodeToCaptureRef)}
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
  );
};

export default Item;
