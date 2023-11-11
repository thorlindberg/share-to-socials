import {StyleSheet} from 'react-native';
import {ExpansionProps} from './types';

const useStyle = (
  dimensions: number,
  aspectRatio: number,
  expansion: ExpansionProps | undefined,
) => {
  return StyleSheet.create({
    grid: {
      alignItems: 'center',
    },
    cell: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: aspectRatio,
    },
    mask: {
      overflow: 'hidden',
    },
    container: {
      width: '100%',
      aspectRatio: aspectRatio,
      transform: [
        {
          scaleX: 3 - (1 / 100) * expansion.top - (1 / 100) * expansion.bottom,
        },
        {
          scaleY: 3 - (1 / 100) * expansion.top - (1 / 100) * expansion.bottom,
        },
        {translateX: 0},
        {
          translateY: 0, // + (45 / 100) * expansion?.top
        },
      ],
    },
    image: {
      resizeMode: 'contain',
      height: '100%',
      aspectRatio: dimensions,
    },
  });
};

export default useStyle;
