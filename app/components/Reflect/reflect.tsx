import React, {useState, useEffect} from 'react';
import {Image, View} from 'react-native';
import {ReflectProps} from './types';
import useStyle from './styles';

const Reflect = ({source, style, expansion, dimensions, setDimensions, aspectRatio, setAspectRatio}: ReflectProps) => {
  const styles = useStyle(dimensions, aspectRatio, expansion);

  const transformations = [
    [{scaleX: -1}, {scaleY: -1}],
    [{scaleX: 1}, {scaleY: -1}],
    [
      {scaleX: -1},
      {scaleY: -1},
      {
        translateX:
          0 - (86 / 100) * expansion.top - (86 / 100) * expansion.bottom,
      },
    ],
    [{scaleX: -1}, {scaleY: 1}],
    [{scaleX: 1}, {scaleY: 1}],
    [
      {scaleX: -1},
      {scaleY: 1},
      {
        translateX:
          0 - (86 / 100) * expansion.top - (86 / 100) * expansion.bottom,
      },
    ],
    [{scaleX: -1}, {scaleY: -1}],
    [{scaleX: 1}, {scaleY: -1}],
    [
      {scaleX: -1},
      {scaleY: -1},
      {
        translateX:
          0 - (86 / 100) * expansion.top - (86 / 100) * expansion.bottom,
      },
    ],
  ];

  const handleImageLoaded = event => {
    const {width, height} = event.nativeEvent.source;
    setDimensions(width / height);
  };

  useEffect(() => {
    setAspectRatio(
      dimensions /
        (1 + (1 / 100) * expansion.top + (1 / 100) * expansion.bottom),
    );
  }, [aspectRatio, dimensions, expansion.bottom, expansion.top]);

  const grid = [];
  for (let row = 0; row < 3; row++) {
    const rowItems = [];
    for (let col = 0; col < 3; col++) {
      const transformIndex = row * 3 + col;

      rowItems.push(
        <View
          key={`cell_${row}_${col}`}
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              transform: transformations[transformIndex],
            },
          ]}>
          <Image
            onLoad={handleImageLoaded}
            source={source}
            style={styles.image}
          />
        </View>,
      );
    }
    grid.push(
      <View key={`row_${row}`} style={{flexDirection: 'row', flex: 1}}>
        {rowItems}
      </View>,
    );
  }

  return (
    <View style={[styles.mask, style]}>
      <View style={styles.container}>{grid}</View>
    </View>
  );
};

export default Reflect;
