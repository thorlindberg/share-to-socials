import React, {useState} from 'react';
import {ImageSourcePropType, ScrollView, Text, View} from 'react-native';
import Item from './Item';
import data from '../assets/json/presets.json';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Discover = ({
  selectedImage,
  menuHeight,
  offsetY,
}: {
  selectedImage: ImageSourcePropType;
  menuHeight: number;
  offsetY?: (value: number) => void;
}) => {
  const safeAreaInsets = useSafeAreaInsets();

  const [width, setWidth] = useState(0);

  const handleScroll = (event: {nativeEvent: {contentOffset: {y: number}}}) => {
    if (offsetY) {
      offsetY(event.nativeEvent.contentOffset.y);
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{
        backgroundColor: 'rgb(235, 235, 235)',
      }}>
      <View
        style={{
          paddingTop: menuHeight + 8,
        }}>
        {Object.entries(data).map(([category, items]) => (
          <View key={category} style={{gap: 16}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                paddingHorizontal: 24,
              }}>
              {category}
            </Text>
            <ScrollView
              horizontal
              onLayout={event => setWidth(event.nativeEvent.layout.width)}
              showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  paddingHorizontal: 24,
                  paddingBottom: safeAreaInsets.bottom
                    ? safeAreaInsets.bottom + 12
                    : 24,
                  gap: 18,
                  flexDirection: 'row',
                }}>
                {items.map((item, index) => (
                  <Item // This should not be here, as Recents will be determined by user behavior and not JSON data
                    key={index}
                    width={width}
                    selectedImage={selectedImage}
                    item={item}
                    rowCount={category === 'Recent' ? 4 : 3}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Discover;
