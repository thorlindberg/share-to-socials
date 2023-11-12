import React, {useState} from 'react';
import {Dimensions, ImageSourcePropType, View} from 'react-native';
import Preview from '../components/Preview/preview';
import Reflect from '../components/Reflect/reflect';

const Device = ({
  selectedImage,
  backgroundColor,
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
}: {
  selectedImage: ImageSourcePropType | null;
  backgroundColor: string;
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
}) => {
  const screenHeight = Dimensions.get('window').height;
  const [dimensions, setDimensions] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(dimensions);

  return (
    <Preview>
      <View
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: 'black',
        }}>
        <View
          style={{
            borderRadius: (100 / screenHeight) * 50,
            overflow: 'hidden',
          }}>
          <View
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
              <Reflect
                style={{
                  transform: [
                    {scaleX: initialPadding},
                    {scaleY: initialPadding},
                  ],
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
    </Preview>
  );
};

export default Device;
