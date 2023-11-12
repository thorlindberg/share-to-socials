import React, {useRef, useState, useEffect} from 'react';
import {
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import handleViewCapture from '../handlers/handleViewCapture';
import handleColorPicker from '../handlers/handleColorPicker';
import TitleBar from '../components/TitleBar/TitleBar';
import {useModal} from 'react-native-modal-provider';
import Device from '../components/Device/device';
import {getColors} from 'react-native-image-colors';

import Color from '../assets/shapes/color.svg';

import Top from '../assets/shapes/top.svg';
import TopSelected from '../assets/shapes/top-selected.svg';
import Vertical from '../assets/shapes/vertical.svg';
import VerticalSelected from '../assets/shapes/vertical-selected.svg';
import Bottom from '../assets/shapes/bottom.svg';
import BottomSelected from '../assets/shapes/bottom-selected.svg';

import Fit from '../assets/shapes/fit.svg';
import FitSelected from '../assets/shapes/fit-selected.svg';
import Fill from '../assets/shapes/fill.svg';
import FillSelected from '../assets/shapes/fill-selected.svg';
import Scale from '../assets/shapes/scale.svg';
import ScaleSelected from '../assets/shapes/scale-selected.svg';

import Left from '../assets/shapes/left.svg';
import LeftSelected from '../assets/shapes/left-selected.svg';
import Horizontal from '../assets/shapes/horizontal.svg';
import HorizontalSelected from '../assets/shapes/horizontal-selected.svg';
import Right from '../assets/shapes/right.svg';
import RightSelected from '../assets/shapes/right-selected.svg';
import handleImagePicker from '../handlers/handleImagePicker';

const Editor = ({
  initialImage,
  backgroundColor,
  initialBackground,
  initialBlur = 200,
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
  initialSizing,
}: {
  initialImage: ImageSourcePropType;
  backgroundColor: string;
  initialBackground: 'Color' | 'Automatic' | 'Duplicate';
  initialBlur?: number;
  initialPadding: number;
  initialHorizontal: 'flex-start' | 'center' | 'flex-end';
  initialVertical: 'flex-start' | 'center' | 'flex-end';
  initialInsetLeft: number;
  initialInsetRight: number;
  initialInsetTop: number;
  initialInsetBottom: number;
  initialTopExpansion: string;
  initialBottomExpansion: string;
  initialLeftExpansion: string;
  initialRightExpansion: string;
  initialSizing: 'Fit' | 'Fill' | 'Scale';
}) => {
  const {closeModal} = useModal();
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const [dimensions, setDimensions] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(dimensions);

  const nodeToCaptureRef = useRef(null);

  const [colors, setColors] = useState<string[]>([
    'red',
    'green',
    'blue',
    'purple',
  ]);
  /*
  useEffect(() => {
    getColors(selectedImage.toString(), {
      fallback: '#228B22',
      cache: true,
      key: selectedImage.toString(),
    }).then(result => {
      switch (result.platform) {
        case 'ios':
          setColors([
            result.background,
            result.detail,
            result.primary,
            result.secondary,
          ]);
          break;
        default:
          throw new Error('Unexpected platform');
      }
    });
  }, [selectedImage]);
  */

  const safeAreaInsets = useSafeAreaInsets();

  const [topExpansion, setTopExpansion] = useState(initialTopExpansion);
  const [bottomExpansion, setBottomExpansion] = useState(
    initialBottomExpansion,
  );
  const [leftExpansion, setLeftExpansion] = useState(initialLeftExpansion);
  const [rightExpansion, setRightExpansion] = useState(initialRightExpansion);
  const [colorSelection, setColorSelection] = useState(backgroundColor);
  const [paddingValue, setPaddingValue] = useState(initialPadding);
  const [sizing, setSizing] = useState(initialSizing);
  const [background, setBackground] = useState(initialBackground);
  const [blur, setBlur] = useState(initialBlur);
  const [horizontal, setHorizontal] = useState(initialHorizontal);
  const [vertical, setVertical] = useState(initialVertical);
  const [insetTop, setInsetTop] = useState(initialInsetTop);
  const [insetBottom, setInsetBottom] = useState(initialInsetBottom);
  const [insetLeft, setInsetLeft] = useState(initialInsetLeft);
  const [insetRight, setInsetRight] = useState(initialInsetRight);
  useEffect(() => {
    setHorizontal('center');
    setVertical('center');
    setInsetTop(0);
    setInsetBottom(0);
    setInsetLeft(0);
    setInsetRight(0);
  }, [sizing]);

  const [fillSize, setFillSize] = useState(0);
  useEffect(() => {
    setFillSize((16 / 9) * aspectRatio);
  }, [aspectRatio, selectedImage]);

  const controls = (
    <View
      style={{
        padding: 24,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgb(220, 220, 220)',
        gap: 12,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', gap: 8}}>
        <TextInput
          onChangeText={setTopExpansion}
          value={topExpansion}
          placeholder="Top"
          keyboardType="numeric"
        />
        <Text>%</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', gap: 8}}>
          <TextInput
            onChangeText={setLeftExpansion}
            value={leftExpansion}
            placeholder="Left"
            keyboardType="numeric"
          />
          <Text>%</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8}}>
          <TextInput
            onChangeText={setRightExpansion}
            value={rightExpansion}
            placeholder="Right"
            keyboardType="numeric"
          />
          <Text>%</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: 8}}>
        <TextInput
          onChangeText={setBottomExpansion}
          value={bottomExpansion}
          placeholder="Bottom"
          keyboardType="numeric"
        />
        <Text>%</Text>
      </View>
    </View>
  );

  const size = (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgb(220, 220, 220)',
      }}>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 12,
          flexDirection: 'row',
        }}>
        {[
          {
            name: 'Fit',
            scale: 1,
            node: <Fit height={56} />,
            selected: <FitSelected height={56} />,
          },
          {
            name: 'Fill',
            scale: fillSize,
            node: <Fill height={56} />,
            selected: <FillSelected height={56} />,
          },
          {
            name: 'Scale',
            scale: 0.8,
            node: <Scale height={56} />,
            selected: <ScaleSelected height={56} />,
          },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={sizing === item.name ? 1 : 0.2}
            onPress={() => {
              setSizing(item.name);
              setPaddingValue(item.scale);
            }}
            style={{flex: 1, alignItems: 'center', gap: 12}}>
            {sizing === item.name ? item.selected : item.node}
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 12,
                backgroundColor: sizing === item.name ? '#0066FF' : 'white',
                borderRadius: 1000,
              }}>
              <Text
                style={{
                  color: sizing === item.name ? 'white' : 'rgb(100, 100, 100)',
                  fontWeight: '600',
                }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {sizing === 'Scale' && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgb(225, 225, 225)',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 24,
              paddingVertical: 8,
              gap: 24,
            }}>
            <View style={{flex: 1}}>
              <Slider
                minimumValue={0}
                maximumValue={5}
                value={paddingValue}
                onValueChange={setPaddingValue}
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {`${paddingValue.toFixed(2)}x`}
            </Text>
          </View>
        </>
      )}
    </View>
  );

  const backgrounds = (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgb(220, 220, 220)',
      }}>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 12,
          flexDirection: 'row',
        }}>
        {[
          {
            name: 'Color',
            node: <Color height={56} />,
            selected: <VerticalSelected height={56} />,
          },
          {
            name: 'Automatic',
            node: <Vertical height={56} />,
            selected: <VerticalSelected height={56} />,
          },
          {
            name: 'Duplicate',
            node: <Fill height={56} />,
            selected: <FillSelected height={56} />,
          },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={background === item.name ? 1 : 0.2}
            onPress={() => {
              setBackground(item.name);
            }}
            style={{flex: 1, alignItems: 'center', gap: 12}}>
            {background === item.name ? item.selected : item.node}
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 12,
                backgroundColor: background === item.name ? '#0066FF' : 'white',
                borderRadius: 1000,
              }}>
              <Text
                style={{
                  color:
                    background === item.name ? 'white' : 'rgb(100, 100, 100)',
                  fontWeight: '600',
                }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {background === 'Color' && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgb(225, 225, 225)',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              handleColorPicker(colorSelection, color => {
                setColorSelection(color);
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 24,
                paddingVertical: 12,
                justifyContent: 'space-between',
              }}>
              <Text>Select background color</Text>
              <View
                style={{
                  width: 42,
                  height: 28,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: 'rgb(220, 220, 220)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 34,
                    height: 20,
                    borderRadius: 2,
                    backgroundColor: colorSelection,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </>
      )}
      {background === 'Automatic' && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgb(225, 225, 225)',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 24,
              paddingVertical: 12,
              justifyContent: 'space-between',
            }}>
            {colors.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setColorSelection(item);
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
                  }}>
                  <View
                    style={{
                      width: 34,
                      height: 20,
                      borderRadius: 2,
                      backgroundColor: item,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      {background === 'Duplicate' && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgb(225, 225, 225)',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 24,
              paddingVertical: 8,
              gap: 24,
            }}>
            <Text
              style={{
                fontWeight: '600',
              }}>
              Blur
            </Text>
            <View style={{flex: 1}}>
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={500} // not sure how to determine the appropriate value
                value={blur}
                onValueChange={setBlur}
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {blur}
            </Text>
          </View>
        </>
      )}
    </View>
  );

  const verticalalignment = (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgb(220, 220, 220)',
      }}>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 12,
          flexDirection: 'row',
        }}>
        {[
          {
            name: 'Top',
            alignment: 'flex-start',
            node: <Top height={56} />,
            selected: <TopSelected height={56} />,
          },
          {
            name: 'Center',
            alignment: 'center',
            node: <Vertical height={56} />,
            selected: <VerticalSelected height={56} />,
          },
          {
            name: 'Bottom',
            alignment: 'flex-end',
            node: <Bottom height={56} />,
            selected: <BottomSelected height={56} />,
          },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={vertical === item.alignment ? 1 : 0.2}
            onPress={() => {
              setVertical(item.alignment);
            }}
            style={{flex: 1, alignItems: 'center', gap: 12}}>
            {vertical === item.alignment ? item.selected : item.node}
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 12,
                backgroundColor:
                  vertical === item.alignment ? '#0066FF' : 'white',
                borderRadius: 1000,
              }}>
              <Text
                style={{
                  color:
                    vertical === item.alignment
                      ? 'white'
                      : 'rgb(100, 100, 100)',
                  fontWeight: '600',
                }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {vertical === 'flex-start' && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgb(225, 225, 225)',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 24,
              paddingVertical: 8,
              gap: 24,
            }}>
            <Text
              style={{
                fontWeight: '600',
              }}>
              Inset
            </Text>
            <View style={{flex: 1}}>
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={100} // not sure how to determine the appropriate value. it should probably never be more than what would equal a centered image
                value={insetTop}
                onValueChange={setInsetTop}
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {insetTop}
            </Text>
          </View>
        </>
      )}
      {vertical === 'flex-end' && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgb(225, 225, 225)',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 24,
              paddingVertical: 8,
              gap: 24,
            }}>
            <Text
              style={{
                fontWeight: '600',
              }}>
              Inset
            </Text>
            <View style={{flex: 1}}>
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={100} // not sure how to determine the appropriate value. it should probably never be more than what would equal a centered image
                value={insetBottom}
                onValueChange={setInsetBottom}
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {insetBottom}
            </Text>
          </View>
        </>
      )}
    </View>
  );

  const horizontalalignment = (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgb(220, 220, 220)',
      }}>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 12,
          flexDirection: 'row',
        }}>
        {[
          {
            name: 'Left',
            alignment: 'flex-start',
            node: <Left height={56} />,
            selected: <LeftSelected height={56} />,
          },
          {
            name: 'Center',
            alignment: 'center',
            node: <Horizontal height={56} />,
            selected: <HorizontalSelected height={56} />,
          },
          {
            name: 'Right',
            alignment: 'flex-end',
            node: <Right height={56} />,
            selected: <RightSelected height={56} />,
          },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={horizontal === item.alignment ? 1 : 0.2}
            onPress={() => {
              setHorizontal(item.alignment);
            }}
            style={{flex: 1, alignItems: 'center', gap: 12}}>
            {horizontal === item.alignment ? item.selected : item.node}
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 12,
                backgroundColor:
                  horizontal === item.alignment ? '#0066FF' : 'white',
                borderRadius: 1000,
              }}>
              <Text
                style={{
                  color:
                    horizontal === item.alignment
                      ? 'white'
                      : 'rgb(100, 100, 100)',
                  fontWeight: '600',
                }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {horizontal === 'flex-start' && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgb(225, 225, 225)',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 24,
              paddingVertical: 8,
              gap: 24,
            }}>
            <Text
              style={{
                fontWeight: '600',
              }}>
              Inset
            </Text>
            <View style={{flex: 1}}>
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={100} // not sure how to determine the appropriate value. it should probably never be more than what would equal a centered image
                value={insetLeft}
                onValueChange={setInsetLeft}
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {insetLeft}
            </Text>
          </View>
        </>
      )}
      {horizontal === 'flex-end' && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgb(225, 225, 225)',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 24,
              paddingVertical: 8,
              gap: 24,
            }}>
            <Text
              style={{
                fontWeight: '600',
              }}>
              Inset
            </Text>
            <View style={{flex: 1}}>
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={100} // not sure how to determine the appropriate value. it should probably never be more than what would equal a centered image
                value={insetRight}
                onValueChange={setInsetRight}
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {insetRight}
            </Text>
          </View>
        </>
      )}
    </View>
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (event: {nativeEvent: {contentOffset: {y: number}}}) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  return (
    <TitleBar
      backgroundColor={isScrolled ? 'white' : 'rgb(235, 235, 235)'}
      cancellationNode={
        <TouchableOpacity onPress={closeModal}>
          <Text style={{color: '#0066FF'}}>Close</Text>
        </TouchableOpacity>
      }
      titleNode={
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
      confirmationNode={
        <TouchableOpacity onPress={() => handleViewCapture(nodeToCaptureRef)}>
          <Text style={{fontWeight: '600', color: '#0066FF'}}>Share</Text>
        </TouchableOpacity>
      }
      detent="medium">
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
        }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            paddingBottom: safeAreaInsets.bottom
              ? safeAreaInsets.bottom + 12
              : 24,
            gap: 18,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'rgb(220, 220, 220)',
              padding: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{height: 400}}>
              <Device
                nodeToCaptureRef={nodeToCaptureRef}
                selectedImage={selectedImage}
                backgroundColor={colorSelection}
                background={background}
                blur={blur}
                initialPadding={paddingValue}
                initialHorizontal={horizontal}
                initialVertical={vertical}
                initialInsetLeft={insetLeft}
                initialInsetRight={insetRight}
                initialInsetTop={insetTop}
                initialInsetBottom={insetBottom}
                initialTopExpansion={topExpansion}
                initialBottomExpansion={bottomExpansion}
                initialLeftExpansion={leftExpansion}
                initialRightExpansion={rightExpansion}
              />
            </View>
          </View>
          {backgrounds}
          {size}
          {sizing !== 'Fill' && verticalalignment}
          {sizing !== 'Fill' && horizontalalignment}
          {controls}
        </View>
      </ScrollView>
    </TitleBar>
  );
};

export default Editor;
