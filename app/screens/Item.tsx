import React, {useRef} from 'react';
import Device from '../components/Device/device';
import handleViewCapture from '../handlers/handleViewCapture';
import {Text, TouchableOpacity, View} from 'react-native';
import Editor from './Editor';
import {useModal} from 'react-native-modal-provider';
import Rounded from '../components/Rounded/Rounded';

const Item = ({width, selectedImage, item}) => {
  const {openModal} = useModal();
  const nodeToCaptureRef = useRef(null);

  return (
    <View
      style={{
        width: (width - 72) / 2.5,
      }}>
      <View
        style={{
          paddingBottom: 24,
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
      <TouchableOpacity onPress={() => handleViewCapture(nodeToCaptureRef)}>
        <Rounded smooth radius={16}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              backgroundColor: '#0066FF',
            }}>
            <Text
              style={{
                paddingVertical: 12,
                color: 'white',
                fontWeight: '600',
              }}>
              Share
            </Text>
          </View>
        </Rounded>
      </TouchableOpacity>
    </View>
  );
};

export default Item;
