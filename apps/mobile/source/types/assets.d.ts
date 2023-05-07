import { StyleProp, ViewStyle } from 'react-native/types';

declare global {
  declare module '*.module.css' {
    const classes: Record<string, StyleProp<ViewStyle>>;

    export default classes;
  }
}
