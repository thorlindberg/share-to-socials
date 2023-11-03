import React, {useState} from 'react';
import {
  Animated,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Rounded from '../Rounded/Rounded';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from '@rneui/themed';
// import {useDebug} from '../DebugProvider/provider';
import handleImagePicker from '../../handlers/handleImagePicker';

const devices = require('../../assets/json/devices.json');
const device = DeviceInfo.getModel();

const Preview = ({
  setFullscreenState,
  fullscreenState,
  menuHeight,
  selectedImage,
  setSelectedImage,
  nodeToCaptureRef,
  colorSelection,
  selectedVerticalAlignment,
  selectedHorizontalAlignment,
  paddingValue,
}: {
  colorSelection: string;
  setFullscreenState: (color: boolean) => void;
  fullscreenState: boolean;
  menuHeight: number;
  selectedImage: ImageSourcePropType | null;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<ImageSourcePropType | null>
  >;
  selectedHorizontalAlignment: string;
  selectedVerticalAlignment: string;
  paddingValue: string;
  nodeToCaptureRef: React.RefObject<View>;
}) => {
  // const {setDebug} = useDebug();

  React.useEffect(() => {
    // setDebug('Device name', device);
  }, []);

  const scale = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(scale, {
      toValue: selectedImage ? 1 : 0.8,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [scale, selectedImage]);

  const opacity = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: selectedImage ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, selectedImage]);

  const statusBar = (
    <View
      style={{
        backgroundColor: 'black',
        width: '100%',
        height: `${
          (100 / devices[device].screen.height) *
          devices[device].safearea.statusbar
        }%`,
      }}
    />
  );

  const homeIndicator = (
    <View
      style={{
        backgroundColor: 'black',
        width: '100%',
        height: `${
          (100 / devices[device].screen.height) * devices[device].safearea.home
        }%`,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: `${
            (100 / devices[device].screen.width) *
            devices[device].safearea.pill.width
          }%`,
          aspectRatio:
            devices[device].safearea.pill.width /
            devices[device].safearea.pill.height,
          borderRadius: 1000,
        }}
      />
    </View>
  );

  const add = (
    <LinearGradient
      colors={['#FFFFFF', '#DBDBDB']}
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}
      style={{
        backgroundColor: 'white',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name="plus"
        size={56}
        type="font-awesome"
        color="#ACACAC"
        style={{
          padding: 32,
          width: 120,
          height: 120,
          backgroundColor: 'white',
          borderRadius: 1000,
        }}
      />
    </LinearGradient>
  );

  const content = (
    <View
      style={{
        width: '100%',
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View
        style={{
          borderRadius: (100 / devices[device].screen.height) * 50,
          overflow: 'hidden',
        }}>
        <View
          ref={nodeToCaptureRef}
          style={{
            aspectRatio: 9 / 16,
            paddingVertical: (100 / devices[device].screen.height) * 70,
            backgroundColor: colorSelection,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: selectedVerticalAlignment,
              justifyContent: selectedHorizontalAlignment,
            }}>
            <Animated.Image
              source={selectedImage}
              style={{
                flex: 1,
                width: `${paddingValue}%`,
                resizeMode: 'contain',
                transform: [{scaleX: scale}, {scaleY: scale}],
                opacity: opacity,
              }}
            />
          </View>
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
            height: `${(100 / devices[device].screen.height) * 70}%`,
            flexDirection: 'row',
            gap: (100 / devices[device].screen.width) * 7,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          {Array.from({length: 100}, (_, index) => (
            <View
              key={index}
              style={{
                backgroundColor:
                  index % 2 === 0 ? 'rgb(155, 155, 155)' : 'rgb(105, 105, 105)',
                opacity: 0.5,
                width: `${(100 / devices[device].screen.width) * 5}%`,
                height: '160%',
                transform: [{rotateZ: '45deg'}],
              }}
            />
          ))}
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        <View
          style={{
            width: '100%',
            height: `${(100 / devices[device].screen.height) * 70}%`,
            flexDirection: 'row',
            gap: (100 / devices[device].screen.width) * 7,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          {Array.from({length: 100}, (_, index) => (
            <View
              key={index}
              style={{
                backgroundColor:
                  index % 2 === 0 ? 'rgb(155, 155, 155)' : 'rgb(105, 105, 105)',
                opacity: 0.5,
                width: `${(100 / devices[device].screen.width) * 5}%`,
                height: '160%',
                transform: [{rotateZ: '45deg'}],
              }}
            />
          ))}
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: 'black'}} />
    </View>
  );

  const paddingBottom = React.useRef(new Animated.Value(menuHeight)).current;
  React.useEffect(() => {
    Animated.timing(paddingBottom, {
      toValue: fullscreenState ? 0 : menuHeight,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [paddingBottom, fullscreenState, menuHeight]);

  const dataLoaded =
    devices[device]?.screen?.width &&
    devices[device]?.screen?.height &&
    devices[device]?.safearea?.statusbar &&
    devices[device]?.safearea?.home &&
    devices[device]?.safearea?.pill?.width &&
    devices[device]?.safearea?.pill?.height;

  const [orientationData] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  /*
  React.useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 10);

    const subscription = accelerometer
      .pipe(
        map(({x, y, z}) => {
          setOrientationData({alpha: x * 360, beta: y * 360, gamma: z * 360});
        }),
      )
      .subscribe(
        speed => console.log(`You moved your phone with ${speed}`),
        error => {
          console.log('The sensor is not available');
        },
      );

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  */

  return (
    <View style={{pointerEvents: 'box-none'}}>
      <Animated.View
        style={{
          height: paddingBottom,
          pointerEvents: 'none',
        }}
      />
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 12},
          shadowOpacity: selectedImage ? 0.25 : 0.15,
          shadowRadius: 12,
          overflow: 'visible',
        }}
        onPress={
          selectedImage
            ? () => setFullscreenState(!fullscreenState)
            : () => {
                handleImagePicker(image => {
                  setSelectedImage(image);
                });
              }
        }>
        <Animated.View
          style={{
            transform: [
              {perspective: 1000},
              {rotateX: `${orientationData.alpha}deg`},
              {rotateY: `${orientationData.beta}deg`},
            ],
          }}>
          {dataLoaded && (
            <Rounded
              smooth
              radius={31}
              style={{
                height: '100%',
                aspectRatio:
                  devices[device].screen.width / devices[device].screen.height,
              }}>
              {selectedImage && statusBar}
              {selectedImage ? content : add}
              {selectedImage && homeIndicator}
            </Rounded>
          )}
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={{
          height: paddingBottom,
          pointerEvents: 'none',
        }}
      />
    </View>
  );
};

export default Preview;
