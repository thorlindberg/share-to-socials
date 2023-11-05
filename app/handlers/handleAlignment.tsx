import {useActionSheet} from '@expo/react-native-action-sheet';

const useHandleAlignment = () => {
  const {showActionSheetWithOptions} = useActionSheet();

  return (setAlignment: (mode: string) => void) => {
    const options = ['Top', 'Center', 'Bottom', 'Cancel'];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        title: 'Alignment',
        cancelButtonIndex,
      },
      selectedIndex => {
        switch (selectedIndex) {
          case 0:
            setAlignment('top');
            break;

          case 1:
            setAlignment('center');
            break;

          case 2:
            setAlignment('bottom');
            break;

          case cancelButtonIndex:
            break;

          default:
            break;
        }
      },
    );
  };
};

export default useHandleAlignment;
