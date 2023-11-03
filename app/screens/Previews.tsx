import React, {ReactNode} from 'react';
import {View} from 'react-native';

const Previews: React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        gap: 36,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        pointerEvents: 'box-none',
      }}>
      {children}
    </View>
  );
};

export default Previews;
