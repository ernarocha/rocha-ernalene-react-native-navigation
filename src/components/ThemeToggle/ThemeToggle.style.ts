import { StyleSheet } from 'react-native';
import { ColorScheme } from '../../types';

export const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    button: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });