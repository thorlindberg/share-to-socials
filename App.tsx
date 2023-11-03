import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import Content from './app/screens/Content';
import {DebugProvider} from './app/components/DebugProvider/provider';

let Root = function App() {
  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <DebugProvider>
          <Content />
        </DebugProvider>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
};

export default Root;
