import * as React from 'react';
import {
  Animated,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';

const HorizontalAlignment = ({
  active,
  setActive,
  selectedHorizontalAlignment,
  setSelectedHorizontalAlignment,
  selectedImage,
}: {
  active: string;
  setActive: (color: string) => void;
  selectedHorizontalAlignment: string;
  setSelectedHorizontalAlignment: (color: string) => void;
  selectedImage: ImageSourcePropType | null;
}) => {
  const flex = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(flex, {
      toValue: active === 'horizontalAlignment' ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [flex, active]);

  return (
    <Animated.View
      style={{
        flex: flex,
        borderColor: active === 'horizontalAlignment' ? '#0066FF' : '#ACACAC',
        borderWidth: 0.5,
        borderRadius: 1000,
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        disabled={!selectedImage || active === 'horizontalAlignment'}
        onPress={() => setActive('horizontalAlignment')}
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {[
          {alignment: 'flex-start'},
          {alignment: 'center'},
          {alignment: 'flex-end'},
        ].map((item, index) => (
          <Animated.View
            key={index}
            style={{
              display:
                selectedHorizontalAlignment === item.alignment
                  ? 0
                  : active === 'horizontalAlignment'
                  ? 0
                  : 1,
              flex: active === 'horizontalAlignment' ? 1 : 0,
            }}>
            <TouchableOpacity
              disabled={
                selectedHorizontalAlignment === item.alignment ||
                active !== 'horizontalAlignment'
              }
              onPress={() => setSelectedHorizontalAlignment(item.alignment)}
              style={{
                alignItems: item.alignment,
                gap: 3,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 3,
                  height: 10,
                  backgroundColor: selectedImage
                    ? selectedHorizontalAlignment === item.alignment
                      ? '#0066FF'
                      : 'black'
                    : '#ACACAC',
                }}
              />
              <View
                style={{
                  width: 3,
                  height: 15,
                  backgroundColor: selectedImage
                    ? selectedHorizontalAlignment === item.alignment
                      ? '#0066FF'
                      : 'black'
                    : '#ACACAC',
                }}
              />
              <View
                style={{
                  width: 3,
                  height: 10,
                  backgroundColor: selectedImage
                    ? selectedHorizontalAlignment === item.alignment
                      ? '#0066FF'
                      : 'black'
                    : '#ACACAC',
                }}
              />
            </TouchableOpacity>
          </Animated.View>
        ))}
        {/*
        <TouchableOpacity
          style={{
            gap: 3,
            flexDirection: 'row',
          }}>
          <View style={{width: 3, height: 15, backgroundColor: 'black'}} />
          <View style={{width: 3, height: 15, backgroundColor: 'black'}} />
          <View style={{width: 3, height: 15, backgroundColor: 'black'}} />
        </TouchableOpacity>
        */}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default HorizontalAlignment;
