import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useStyle = (backgroundColor, detent, scaling = 1) => {
  const safeAreaInsets = useSafeAreaInsets();
  return StyleSheet.create({
    dividerStyle: {
      height: 1,
      backgroundColor: 'rgb(225, 225, 225)',
    },
    containerStyle: {
      flex: scaling,
      backgroundColor: backgroundColor,
      paddingTop: detent === 'large' ? safeAreaInsets.top : 0,
    },
    titleBarStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
  });
};

export default useStyle;
