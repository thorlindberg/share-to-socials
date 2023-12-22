import * as React from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import Composite from '../components/Composite/composite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Preview = ({
  selectedImage,
  item,
  setIsPreviewing,
  nodeToCaptureRef,
}: {
  selectedImage: ImageSourcePropType;
  item: any;
  setIsPreviewing: (value: boolean) => void;
  nodeToCaptureRef: React.RefObject<View>;
}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const statusBarHeight = safeAreaInsets.top;
  const homeIndicatorHeight = safeAreaInsets.bottom;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setIsPreviewing(false)}
      style={{height: '100%', width: '100%'}}>
      <View
        style={{
          flex: 1,
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 12},
          shadowOpacity: 0.1,
          shadowRadius: 12,
          overflow: 'visible',
        }}>
        <View
          style={{
            height: '100%',
            aspectRatio: screenWidth / screenHeight,
          }}>
          {statusBar}
          {item && (
            <Composite
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
          )}
          {homeIndicator}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Preview;
