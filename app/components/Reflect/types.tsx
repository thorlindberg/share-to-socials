import {ViewStyle} from 'react-native';

export type ExpansionProps = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type ReflectProps = {
  source: any;
  style?: ViewStyle;
  expansion?: ExpansionProps;
};
