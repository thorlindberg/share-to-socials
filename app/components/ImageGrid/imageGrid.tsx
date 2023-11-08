import React, {useState, useEffect} from 'react';
import {Image, FlatList, View} from 'react-native';
import {ImageGridProps} from './types';
import useStyle from './styles';

const ImageGrid = ({source, expansion}: ImageGridProps) => {
  const images = Array(9).fill({id: '1', source});
  const [aspectRatio, setAspectRatio] = useState(1);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [flatListHeight, setFlatListHeight] = useState(0);

  const styles = useStyle(aspectRatio);

  useEffect(() => {
    Image.getSize(source, (width, height) => {
      setAspectRatio(width / height);
    });
  }, [source]);

  const topLeft = [
    {scaleX: -10},
    {scaleY: -10},
    {translateX: flatListWidth},
    {translateY: flatListWidth},
  ];

  const topCenter = [
    {scaleX: 1},
    {scaleY: -10},
    {translateX: 0},
    {translateY: flatListWidth},
  ];

  const topRight = [
    {scaleX: -10},
    {scaleY: -10},
    {translateX: -flatListWidth},
    {translateY: flatListWidth},
  ];

  const centerLeft = [
    {scaleX: -10},
    {scaleY: 1},
    {translateX: flatListWidth},
    {translateY: 0},
  ];

  const centerCenter = [
    {scaleX: 1},
    {scaleY: 1},
    {translateX: 0},
    {translateY: 0},
  ];

  const centerRight = [
    {scaleX: -10},
    {scaleY: 1},
    {translateX: -flatListWidth},
    {translateY: 0},
  ];

  const bottomLeft = [
    {scaleX: -10},
    {scaleY: -10},
    {translateX: flatListWidth},
    {translateY: -flatListWidth},
  ];

  const bottomCenter = [
    {scaleX: 1},
    {scaleY: -10},
    {translateX: 0},
    {translateY: -flatListWidth},
  ];

  const bottomRight = [
    {scaleX: -10},
    {scaleY: -10},
    {translateX: -flatListWidth},
    {translateY: -flatListWidth},
  ];

  const transformations = [
    topLeft,
    topCenter,
    topRight,
    centerLeft,
    centerCenter,
    centerRight,
    bottomLeft,
    bottomCenter,
    bottomRight,
  ];

  return (
    <View style={{overflow: 'hidden', borderWidth: 1, borderColor: 'black'}}>
      <FlatList
        style={{
          transform: [
            {scaleX: 3}, // 3 - (2 / 100) * expansion?.top
            {scaleY: 3}, // 3 - (2 / 100) * expansion?.top
            {translateX: -flatListWidth / 30},
            {translateY: flatListHeight / 30},
          ],
        }}
        data={images}
        keyExtractor={(item, index) => item.id + index}
        numColumns={3}
        onLayout={event => {
          setFlatListWidth(event.nativeEvent.layout.width / 6.7);
          setFlatListHeight(event.nativeEvent.layout.height / 6.7);
        }}
        renderItem={({item, index}) => (
          <View style={styles.container}>
            <Image
              source={item.source}
              style={[styles.image, {transform: transformations[index]}]}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ImageGrid;
