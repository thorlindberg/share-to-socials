import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import Rounded from '../Rounded/Rounded';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from '@rneui/themed';
// import {useDebug} from '../DebugProvider/provider';
import handleImagePicker from '../../handlers/handleImagePicker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Preview = ({
  setFullscreenState,
  fullscreenState,
  menuHeight,
  selectedImage,
  setSelectedImage,
  nodeToCaptureRef,
  colorSelection,
  paddingValue,
  resizingMode,
  alignment,
}: {
  colorSelection: string;
  setFullscreenState: (color: boolean) => void;
  fullscreenState: boolean;
  menuHeight: number;
  selectedImage: ImageSourcePropType | null;
  setSelectedImage: React.Dispatch<
    React.SetStateAction<ImageSourcePropType | null>
  >;
  paddingValue: string;
  nodeToCaptureRef: React.RefObject<View>;
  resizingMode: string;
  alignment: string;
}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const statusBarHeight = safeAreaInsets.top;
  const homeIndicatorHeight = safeAreaInsets.bottom;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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

  const scaling = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(scaling, {
      toValue: fullscreenState
        ? 1
        : (1 / screenHeight) * (screenHeight - 2 * menuHeight),
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [fullscreenState, menuHeight, scaling, screenHeight]);

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
        height: `${(100 / screenHeight) * statusBarHeight}%`,
      }}
    />
  );

  const homeIndicator = (
    <View
      style={{
        backgroundColor: 'black',
        width: '100%',
        height: `${(100 / screenHeight) * homeIndicatorHeight}%`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
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
              alignItems: 'center',
              justifyContent: alignment,
            }}>
            <Animated.Image
              source={selectedImage}
              style={{
                width: resizingMode === 'cover' ? '100%' : `${100 - paddingValue}%`,
                height:
                  resizingMode === 'cover'
                    ? '100%'
                    : `${100 - 2 * (100 / screenHeight) * 70}%`,
                resizeMode: resizingMode,
                transform: [{scaleX: scale}, {scaleY: scale}],
                opacity: opacity,
              }}
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
    <Animated.View
      style={{
        pointerEvents: 'box-none',
        transform: [{scaleX: scaling}, {scaleY: scaling}],
      }}>
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
          <Rounded
            smooth
            radius={31}
            style={{
              height: '100%',
              aspectRatio: screenWidth / screenHeight,
            }}>
            {selectedImage && statusBar}
            {selectedImage ? content : add}
            {selectedImage && homeIndicator}
          </Rounded>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Preview;
