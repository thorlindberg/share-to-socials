import {StyleProp, ViewStyle} from 'react-native';

interface RoundedProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  radius: number;
  smooth?: boolean;
  borderWidth?: number;
  borderColor?: string;
}

export default RoundedProps;
