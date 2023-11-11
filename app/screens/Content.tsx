import React, {useRef, useState, useEffect} from 'react';
import Reflect from '../components/Reflect/reflect';
import {
  Dimensions,
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Preview from '../components/Preview/preview';
import handleImagePicker from '../handlers/handleImagePicker';
import handleViewCapture from '../handlers/handleViewCapture';
import handleColorPicker from '../handlers/handleColorPicker';
import Menu from '../components/Menu/menu';
import {Icon} from '@rneui/themed';

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

const Content = () => {
  const [dimensions, setDimensions] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(dimensions);

  const safeAreaInsets = useSafeAreaInsets();
  const nodeToCaptureRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;

  const [topExpansion, setTopExpansion] = useState(0);
  const [bottomExpansion, setBottomExpansion] = useState(0);
  const [leftExpansion, setLeftExpansion] = useState(0);
  const [rightExpansion, setRightExpansion] = useState(0);
  const [colorSelection, setColorSelection] = useState('white');
  const [paddingValue, setPaddingValue] = useState(1);
  const [sizing, setSizing] = useState('Fit');
  const [horizontal, setHorizontal] = useState('center');
  const [vertical, setVertical] = useState('center');
  const [selectedImage, setSelectedImage] =
    useState<ImageSourcePropType | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (event: {nativeEvent: {contentOffset: {y: number}}}) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 8) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

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
      }}>
      <Text>Top</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={topExpansion}
        onValueChange={setTopExpansion}
        minimumTrackTintColor="#0066FF"
        maximumTrackTintColor="#000000"
      />
      <Text>Bottom</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={bottomExpansion}
        onValueChange={setBottomExpansion}
        minimumTrackTintColor="#0066FF"
        maximumTrackTintColor="#000000"
      />
      <Text>Left</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={leftExpansion}
        onValueChange={setLeftExpansion}
        minimumTrackTintColor="#0066FF"
        maximumTrackTintColor="#000000"
      />
      <Text>Right</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={rightExpansion}
        onValueChange={setRightExpansion}
        minimumTrackTintColor="#0066FF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );

  const instagram = (
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
          ref={nodeToCaptureRef}
          style={{
            aspectRatio: 9 / 16,
            backgroundColor: colorSelection,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: horizontal,
              justifyContent: vertical,
            }}>
            {selectedImage && (
              <Reflect
                style={{
                  transform: [{scaleX: paddingValue}, {scaleY: paddingValue}],
                }}
                source={selectedImage}
                expansion={{
                  top: topExpansion,
                  bottom: bottomExpansion,
                  left: leftExpansion,
                  right: rightExpansion,
                }}
                dimensions={dimensions}
                setDimensions={setDimensions}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
              />
            )}
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

  const colorPicker = (
    <TouchableOpacity
      onPress={() => {
        handleColorPicker(colorSelection, color => {
          setColorSelection(color);
        });
      }}>
      <View
        style={{
          paddingVertical: 14,
          paddingHorizontal: 24,
          backgroundColor: 'white',
          borderRadius: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'rgb(220, 220, 220)',
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

  const verticalalignment = (
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
                  vertical === item.alignment ? 'white' : 'rgb(100, 100, 100)',
                fontWeight: '600',
              }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const horizontalalignment = (
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
  );

  const alignment = (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgb(220, 220, 220)',
      }}>
      {verticalalignment}
      <View
        style={{
          height: 1,
          backgroundColor: 'rgb(225, 225, 225)',
        }}
      />
      {horizontalalignment}
    </View>
  );

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        paddingTop: safeAreaInsets.top,
        backgroundColor: isScrolled ? 'white' : 'rgb(235, 235, 235)',
      }}>
      <Menu>
        <TouchableOpacity
          onPress={() => {
            handleImagePicker(image => {
              setSelectedImage(image);
            });
          }}>
          <Text style={{fontWeight: '600', color: '#0066FF'}}>Image</Text>
        </TouchableOpacity>
        <View
          style={{
            borderRadius: 1000,
            backgroundColor: 'rgb(235, 235, 235)',
            flexDirection: 'row',
            paddingVertical: 4,
            paddingHorizontal: 12,
            alignItems: 'center',
            gap: 8,
          }}>
          <Text
            style={{
              fontWeight: '600',
            }}>
            Instagram Story
          </Text>
          <Icon name="chevron-down" type="feather" size={20} />
        </View>
        <TouchableOpacity onPress={() => handleViewCapture(nodeToCaptureRef)}>
          <Text style={{fontWeight: '600', color: '#0066FF'}}>Share</Text>
        </TouchableOpacity>
      </Menu>
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
            padding: 24,
            paddingTop: 12,
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
            <View style={{width: '50%'}}>
              <Preview>{instagram}</Preview>
            </View>
          </View>
          {colorPicker}
          {size}
          {alignment}
          {controls}
        </View>
      </ScrollView>
    </View>
  );
};

export default Content;
