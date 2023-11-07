import * as React from 'react';
import {Image, FlatList, View} from 'react-native';
import {ImageGridProps} from './types';
import styles from './styles';

const transformations = [
  [{scaleX: -1}, {scaleY: -1}],
  [{scaleX: 1}, {scaleY: -1}],
  [{scaleX: -1}, {scaleY: -1}],
  [{scaleX: -1}, {scaleY: 1}],
  [{scaleX: 1}, {scaleY: 1}],
  [{scaleX: -1}, {scaleY: 1}],
  [{scaleX: -1}, {scaleY: -1}],
  [{scaleX: 1}, {scaleY: -1}],
  [{scaleX: -1}, {scaleY: -1}],
];

const ImageGrid = ({source}: ImageGridProps) => {
  const images = Array(9).fill({id: '1', source});

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => item.id + index}
      numColumns={3}
      renderItem={({item, index}) => (
        <View style={styles.container}>
          <Image
            source={item.source}
            style={[styles.image, {transform: transformations[index]}]}
          />
        </View>
      )}
    />
  );
};

export default ImageGrid;
