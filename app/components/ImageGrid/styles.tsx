import {StyleSheet} from 'react-native';

const useStyle = (aspectRatio: number) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      aspectRatio: aspectRatio,
      overflow: 'hidden',
    },
    image: {
      flex: 1,
      aspectRatio: aspectRatio,
    },
  });
};

export default useStyle;
