import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import Rounded from '../Rounded/Rounded';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Preview = ({children}: {children: React.ReactNode}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const statusBarHeight = safeAreaInsets.top;
  const homeIndicatorHeight = safeAreaInsets.bottom;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [viewHeight, setViewHeight] = useState(0);

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
    <View
      onLayout={event => setViewHeight(event.nativeEvent.layout.height)}
      style={{
        flex: 1,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 12},
        shadowOpacity: 0.1,
        shadowRadius: 12,
        overflow: 'visible',
      }}>
      <Rounded
        smooth
        radius={safeAreaInsets.bottom ? viewHeight * 0.08 : 0}
        style={{
          height: '100%',
          aspectRatio: screenWidth / screenHeight,
        }}>
        {statusBar}
        {children}
        {homeIndicator}
      </Rounded>
    </View>
  );
};

export default Preview;
