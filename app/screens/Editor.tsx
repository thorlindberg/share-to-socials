import React, {useState, useEffect} from 'react';
import {
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import handleColorPicker from '../handlers/handleColorPicker';
// import { getColors } from 'react-native-image-colors';
import handleViewCapture from '../handlers/handleViewCapture';
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
import {Icon} from '@rneui/themed';
import Composite from '../components/Composite/composite';

const Editor = ({
  selectedImage,
  item,
  setSelectedItem,
  setIsPreviewing,
  nodeToCaptureRef,
}: {
  selectedImage: ImageSourcePropType;
  item: any;
  setSelectedItem: (item: any) => void;
  setIsPreviewing: (value: boolean) => void;
  nodeToCaptureRef: React.RefObject<View>;
}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const [colors] = useState<string[]>(['red', 'green', 'blue', 'purple']); // [colors, setColors]
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

  useEffect(() => {
    setSelectedItem({
      ...item,
      alignment: {
        ...item.alignment,
        horizontal: 'center',
      },
    });
    setSelectedItem({
      ...item,
      alignment: {
        ...item.alignment,
        vertical: 'center',
      },
    });
    setSelectedItem({
      ...item,
      inset: {
        ...item.inset,
        top: 0,
      },
    });
    setSelectedItem({
      ...item,
      inset: {
        ...item.inset,
        bottom: 0,
      },
    });
    setSelectedItem({
      ...item,
      inset: {
        ...item.inset,
        left: 0,
      },
    });
    setSelectedItem({
      ...item,
      inset: {
        ...item.inset,
        right: 0,
      },
    });
  }, [item, item.sizing, setSelectedItem]); // should only be `item.sizing`

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
          onChangeText={value =>
            setSelectedItem({
              ...item,
              expansion: {
                ...item.expansion,
                top: value,
              },
            })
          }
          value={item.expansion.top}
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
            onChangeText={value =>
              setSelectedItem({
                ...item,
                expansion: {
                  ...item.expansion,
                  left: value,
                },
              })
            }
            value={item.expansion.left}
            placeholder="Left"
            keyboardType="numeric"
          />
          <Text>%</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8}}>
          <TextInput
            onChangeText={value =>
              setSelectedItem({
                ...item,
                expansion: {
                  ...item.expansion,
                  right: value,
                },
              })
            }
            value={item.expansion.right}
            placeholder="Right"
            keyboardType="numeric"
          />
          <Text>%</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: 8}}>
        <TextInput
          onChangeText={value =>
            setSelectedItem({
              ...item,
              expansion: {
                ...item.expansion,
                bottom: value,
              },
            })
          }
          value={item.expansion.bottom}
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
            scale: 16 / 9,
            node: <Fill height={56} />,
            selected: <FillSelected height={56} />,
          },
          {
            name: 'Scale',
            scale: 0.8,
            node: <Scale height={56} />,
            selected: <ScaleSelected height={56} />,
          },
        ].map((option, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={item.sizing === option.name ? 1 : 0.2}
            onPress={() => {
              setSelectedItem({...item, sizing: option.name});
              setSelectedItem({...item, scale: option.scale});
            }}
            style={{flex: 1, alignItems: 'center', gap: 12}}>
            {item.sizing === option.name ? option.selected : option.node}
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 12,
                backgroundColor:
                  item.sizing === option.name ? '#0066FF' : 'white',
                borderRadius: 1000,
              }}>
              <Text
                style={{
                  color:
                    item.sizing === option.name
                      ? 'white'
                      : 'rgb(100, 100, 100)',
                  fontWeight: '600',
                }}>
                {option.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {item.sizing === 'Scale' && (
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
                value={item.scale}
                onValueChange={value =>
                  setSelectedItem({...item, scale: value})
                }
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {`${item.scale.toFixed(2)}x`}
            </Text>
          </View>
        </>
      )}
    </View>
  );

  const preview = (
    <TouchableOpacity onPress={() => setIsPreviewing(true)}>
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
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 250,
              overflow: 'hidden',
              borderRadius: 8,
              borderWidth: 3,
              borderColor: 'rgb(230, 230, 230)',
            }}>
            <Composite
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
          </View>
        </View>
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
          <Text>Preview in fullscreen</Text>
          <Icon
            name="chevron-right"
            type="feather"
            size={24}
            color="rgb(180, 180, 180)"
          />
        </View>
      </View>
    </TouchableOpacity>
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
        ].map((option, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={item.background === option.name ? 1 : 0.2}
            onPress={() => {
              setSelectedItem({...item, background: option.name});
            }}
            style={{flex: 1, alignItems: 'center', gap: 12}}>
            {item.background === option.name ? option.selected : option.node}
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 12,
                backgroundColor:
                  item.background === option.name ? '#0066FF' : 'white',
                borderRadius: 1000,
              }}>
              <Text
                style={{
                  color:
                    item.background === option.name
                      ? 'white'
                      : 'rgb(100, 100, 100)',
                  fontWeight: '600',
                }}>
                {option.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {item.background === 'Color' && (
        <>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgb(225, 225, 225)',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              handleColorPicker(item.backgroundColor, color =>
                setSelectedItem({...item, backgroundColor: color}),
              );
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
                    backgroundColor: item.backgroundColor,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </>
      )}
      {item.background === 'Automatic' && (
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
            {colors.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedItem({...item, backgroundColor: option});
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
                      backgroundColor: option,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      {item.background === 'Duplicate' && (
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
                value={item.blur}
                onValueChange={value => setSelectedItem({...item, blur: value})}
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {item.blur}
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
        ].map((option, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={
              item.alignment.vertical === option.alignment ? 1 : 0.2
            }
            onPress={() => {
              setSelectedItem({
                ...item,
                alignment: {
                  ...item.alignment,
                  vertical: option.alignment,
                },
              });
            }}
            style={{flex: 1, alignItems: 'center', gap: 12}}>
            {item.alignment.vertical === option.alignment
              ? option.selected
              : option.node}
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 12,
                backgroundColor:
                  item.alignment.vertical === option.alignment
                    ? '#0066FF'
                    : 'white',
                borderRadius: 1000,
              }}>
              <Text
                style={{
                  color:
                    item.alignment.vertical === option.alignment
                      ? 'white'
                      : 'rgb(100, 100, 100)',
                  fontWeight: '600',
                }}>
                {option.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {item.alignment.vertical === 'flex-start' && (
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
                value={item.inset.top}
                onValueChange={value =>
                  setSelectedItem({
                    ...item,
                    inset: {
                      ...item.inset,
                      top: value,
                    },
                  })
                }
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {item.inset.top}
            </Text>
          </View>
        </>
      )}
      {item.alignment.vertical === 'flex-end' && (
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
                value={item.inset.bottom}
                onValueChange={value =>
                  setSelectedItem({
                    ...item,
                    inset: {
                      ...item.inset,
                      bottom: value,
                    },
                  })
                }
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {item.inset.bottom}
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
        ].map((option, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={
              item.alignment.horizontal === option.alignment ? 1 : 0.2
            }
            onPress={() => {
              setSelectedItem({
                ...item,
                alignment: {
                  ...item.alignment,
                  horizontal: option.alignment,
                },
              });
            }}
            style={{flex: 1, alignItems: 'center', gap: 12}}>
            {item.alignment.horizontal === option.alignment
              ? option.selected
              : option.node}
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 12,
                backgroundColor:
                  item.alignment.horizontal === option.alignment
                    ? '#0066FF'
                    : 'white',
                borderRadius: 1000,
              }}>
              <Text
                style={{
                  color:
                    item.alignment.horizontal === option.alignment
                      ? 'white'
                      : 'rgb(100, 100, 100)',
                  fontWeight: '600',
                }}>
                {option.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {item.alignment.horizontal === 'flex-start' && (
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
                value={item.inset.left}
                onValueChange={value =>
                  setSelectedItem({
                    ...item,
                    inset: {
                      ...item.inset,
                      left: value,
                    },
                  })
                }
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {item.inset.left}
            </Text>
          </View>
        </>
      )}
      {item.alignment.horizontal === 'flex-end' && (
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
                value={item.inset.right}
                onValueChange={value =>
                  setSelectedItem({
                    ...item,
                    inset: {
                      ...item.inset,
                      right: value,
                    },
                  })
                }
                minimumTrackTintColor="#0066FF"
                maximumTrackTintColor="#000000"
              />
            </View>
            <Text
              style={{
                color: '#0066FF',
                fontWeight: '600',
              }}>
              {item.inset.right}
            </Text>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 56,
        borderBottomRightRadius: 56,
      }}>
      <View
        style={{
          backgroundColor: '#0066FF',
          paddingTop: safeAreaInsets.top,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingBottom: 10,
          borderTopRightRadius: 56,
        }}>
        <TouchableOpacity
          onPress={() => setSelectedItem(null)}
          style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <Icon name="chevron-left" type="feather" size={24} color="white" />
          <Text style={{fontSize: 16, color: 'white'}}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleViewCapture(nodeToCaptureRef)}
          style={{gap: 12}}>
          <Text style={{fontSize: 16, color: 'white', fontWeight: '600'}}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgb(235, 235, 235)',
          borderBottomRightRadius: 56,
        }}>
        <ScrollView
          style={{
            borderBottomRightRadius: 56,
          }}>
          <View
            style={{
              padding: 20,
              gap: 16,
              paddingBottom: safeAreaInsets.bottom ? safeAreaInsets.bottom : 20,
            }}>
            {preview}
            {backgrounds}
            {size}
            {item.sizing !== 'Fill' && verticalalignment}
            {item.sizing !== 'Fill' && horizontalalignment}
            {controls}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Editor;
