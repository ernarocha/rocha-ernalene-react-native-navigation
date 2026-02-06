import { StyleSheet } from 'react-native';
import { ColorScheme } from '../../types';

export const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 12,
      overflow: 'hidden',
    },
    button: {
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.primary,
    },
    quantity: {
      minWidth: 36,
      textAlign: 'center',
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
    },
  });