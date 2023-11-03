import React from 'react';
import {DebugProviderProps} from './types';
import {DebugContext, useDebug} from './context';
import {Text, View, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Provider = ({children, debug}: DebugProviderProps) => {
  const safeAreaInsets = useSafeAreaInsets();
  const {getDebug} = useDebug();
  const debugNode = (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        flexDirection: 'row',
        justifyContent: 'space-between',
        pointerEvents: 'none',
      }}>
      <View>
        <View>
          <Text
            style={{
              backgroundColor: 'blue',
              color: 'white',
              paddingVertical: 4,
              paddingHorizontal: 8,
              fontWeight: 'bold',
            }}>
            DEBUG MODE
          </Text>
          <Text
            style={{
              backgroundColor: 'blue',
              color: 'white',
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}>
            Enabled: {`${debug}`}
          </Text>
        </View>
        <View>
          <Text
            style={{
              backgroundColor: 'red',
              color: 'white',
              paddingVertical: 4,
              paddingHorizontal: 8,
              fontWeight: 'bold',
            }}>
            PROVIDER VALUES
          </Text>
          {Object.entries(getDebug()).map(([key, value]) => (
            <Text
              key={key}
              style={{
                backgroundColor: 'red',
                color: 'white',
                paddingVertical: 4,
                paddingHorizontal: 8,
              }}>
              {key}: {value}
            </Text>
          ))}
        </View>
      </View>
      <View>
        <View>
          <Text
            style={{
              backgroundColor: 'green',
              color: 'white',
              paddingVertical: 4,
              paddingHorizontal: 8,
              fontWeight: 'bold',
            }}>
            DEVICE DIMENSIONS
          </Text>
          <Text
            style={{
              backgroundColor: 'green',
              color: 'white',
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}>
            StatusBar: {safeAreaInsets.top}
          </Text>
          <Text
            style={{
              backgroundColor: 'green',
              color: 'white',
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}>
            Content:{' '}
            {Dimensions.get('window').height -
              safeAreaInsets.top -
              safeAreaInsets.bottom}
          </Text>
          <Text
            style={{
              backgroundColor: 'green',
              color: 'white',
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}>
            Home indicator: {safeAreaInsets.bottom}
          </Text>
          <Text
            style={{
              backgroundColor: 'green',
              color: 'white',
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}>
            Total width: {Dimensions.get('window').width}
          </Text>
          <Text
            style={{
              backgroundColor: 'green',
              color: 'white',
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}>
            Total height: {Dimensions.get('window').height}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>{children}</View>
      {debug && debugNode}
    </View>
  );
};

export const DebugProvider = ({children, debug}: DebugProviderProps) => {
  return (
    <DebugContext debug={debug}>
      <Provider children={children} debug={debug} />
    </DebugContext>
  );
};

export {useDebug};
