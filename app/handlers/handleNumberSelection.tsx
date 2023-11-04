import {Alert} from 'react-native';

const handleNumberSelection = callback => {
  Alert.prompt(
    'Enter a number',
    'for the percentage of padding',
    text => {
      if (text !== null) {
        callback(text);
      }
    },
    'plain-text',
    '',
    'numeric',
  );
};

export default handleNumberSelection;
