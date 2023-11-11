import * as React from 'react';
import {View} from 'react-native';

const Menu = ({children}: {children: React.ReactNode}) => {
  return (
    <View
      style={{
        paddingVertical: 14,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {children}
    </View>
  );
};

export default Menu;
