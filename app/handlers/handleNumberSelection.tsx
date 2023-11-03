import {Alert} from 'react-native';

const handleNumberSelection = callback => {
  Alert.prompt(
    'Enter a number',
    'Please enter a number:',
    text => {
      if (text !== null) {
        console.log(`User entered: ${text}`);
        callback(text);
      }
    },
    'plain-text',
    '',
    'numeric',
  );
};

export default handleNumberSelection;
