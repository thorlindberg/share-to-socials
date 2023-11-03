import * as React from 'react';
import {
  Animated,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';

const VerticalAlignment = ({
  active,
  setActive,
  selectedVerticalAlignment,
  setSelectedVerticalAlignment,
  selectedImage,
}: {
  active: string;
  setActive: (color: string) => void;
  selectedVerticalAlignment: string;
  setSelectedVerticalAlignment: (color: string) => void;
  selectedImage: ImageSourcePropType | null;
}) => {
  const flex = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(flex, {
      toValue: active === 'verticalAlignment' ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [flex, active]);

  return (
    <Animated.View
      style={{
        flex: flex,
        borderColor: active === 'verticalAlignment' ? '#0066FF' : '#ACACAC',
        borderWidth: 0.5,
        borderRadius: 1000,
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        disabled={!selectedImage || active === 'verticalAlignment'}
        onPress={() => setActive('verticalAlignment')}
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {[
          {justify: 'flex-start'},
          {justify: 'center'},
          {justify: 'flex-end'},
        ].map((item, index) => (
          <Animated.View
            key={index}
            style={{
              display:
                selectedVerticalAlignment === item.justify
                  ? 0
                  : active === 'verticalAlignment'
                  ? 0
                  : 1,
              flex: active === 'verticalAlignment' ? 1 : 0,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              disabled={
                selectedVerticalAlignment === item.justify ||
                active !== 'verticalAlignment'
              }
              onPress={() => setSelectedVerticalAlignment(item.justify)}
              style={{
                alignItems: item.justify,
                gap: 3,
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 10,
                  height: 3,
                  backgroundColor: selectedImage
                    ? selectedVerticalAlignment === item.justify
                      ? '#0066FF'
                      : 'black'
                    : '#ACACAC',
                }}
              />
              <View
                style={{
                  width: 15,
                  height: 3,
                  backgroundColor: selectedImage
                    ? selectedVerticalAlignment === item.justify
                      ? '#0066FF'
                      : 'black'
                    : '#ACACAC',
                }}
              />
              <View
                style={{
                  width: 10,
                  height: 3,
                  backgroundColor: selectedImage
                    ? selectedVerticalAlignment === item.justify
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

export default VerticalAlignment;
