import {useActionSheet} from '@expo/react-native-action-sheet';

const useHandleResizingMode = () => {
  const {showActionSheetWithOptions} = useActionSheet();

  return (setResizingMode: (mode: string) => void) => {
    const options = ['Contain', 'Fill', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        title: 'Resizing Mode',
        cancelButtonIndex,
      },
      selectedIndex => {
        switch (selectedIndex) {
          case 0:
            setResizingMode('contain');
            break;

          case 1:
            setResizingMode('cover');
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

export default useHandleResizingMode;
