import ColorPicker from 'react-native-color-picker-ios';

const handleColorPicker = (colorSelection, callback) => {
  ColorPicker.showColorPicker(
    {supportsAlpha: true, initialColor: colorSelection},
    color => {
      callback(color);
    },
  );
};

export default handleColorPicker;
