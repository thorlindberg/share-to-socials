import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import Source from './app/screens/Source';
import {DebugProvider} from './app/components/DebugProvider/provider';

let Root = function App() {
  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <DebugProvider>
          <Source />
        </DebugProvider>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
};

export default Root;
