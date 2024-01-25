import React, {useState} from 'react';
import {Dimensions, Image, ImageSourcePropType, View} from 'react-native';
import Reflect from '../Reflect/reflect';

const Composite = ({
  selectedImage,
  backgroundColor = 'white',
  background,
  blur = 200,
  initialPadding,
  initialHorizontal,
  initialVertical,
  initialInsetLeft,
  initialInsetRight,
  initialInsetTop,
  initialInsetBottom,
  initialTopExpansion,
  initialBottomExpansion,
  initialLeftExpansion,
  initialRightExpansion,
  nodeToCaptureRef,
}: {
  selectedImage: ImageSourcePropType;
  backgroundColor?: string;
  background: 'Color' | 'Automatic' | 'Duplicate';
  blur?: number;
  initialPadding: number;
  initialHorizontal: 'flex-start' | 'center' | 'flex-end';
  initialVertical: 'flex-start' | 'center' | 'flex-end';
  initialInsetLeft: number;
  initialInsetRight: number;
  initialInsetTop: number;
  initialInsetBottom: number;
  initialTopExpansion: number;
  initialBottomExpansion: number;
  initialLeftExpansion: number;
  initialRightExpansion: number;
  nodeToCaptureRef?: React.RefObject<View>;
}) => {
  const screenHeight = Dimensions.get('window').height;
  const [dimensions, setDimensions] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(dimensions);

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View
        style={{
          overflow: 'hidden',
        }}>
        <View
          ref={nodeToCaptureRef}
          style={{
            aspectRatio: 9 / 16,
            backgroundColor: backgroundColor,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: initialHorizontal,
              justifyContent: initialVertical,
              transform: [
                {translateX: initialInsetLeft - initialInsetRight},
                {translateY: initialInsetTop - initialInsetBottom},
              ],
            }}>
            {background === 'Duplicate' && (
              <Image
                style={{height: '100%', aspectRatio: aspectRatio}}
                source={selectedImage}
                blurRadius={blur}
              />
            )}
            <Reflect
              style={{
                position: 'absolute',
                transform: [{scaleX: initialPadding}, {scaleY: initialPadding}],
              }}
              source={selectedImage}
              expansion={{
                top: initialTopExpansion,
                bottom: initialBottomExpansion,
                left: initialLeftExpansion,
                right: initialRightExpansion,
              }}
              dimensions={dimensions}
              setDimensions={setDimensions}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
            />
          </View>
        </View>
        <View
          style={{
            aspectRatio: 9 / 16,
            position: 'absolute',
          }}>
          <View
            style={{
              width: '100%',
              height: `${(100 / screenHeight) * 70}%`,
              flexDirection: 'row',
              overflow: 'hidden',
              backgroundColor: 'red',
            }}
          />
          <View
            style={{
              flex: 1,
            }}
          />
          <View
            style={{
              width: '100%',
              height: `${(100 / screenHeight) * 70}%`,
              flexDirection: 'row',
              overflow: 'hidden',
              backgroundColor: 'red',
            }}
          />
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: 'black'}} />
    </View>
  );
};

export default Composite;
