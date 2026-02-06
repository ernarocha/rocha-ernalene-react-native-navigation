import { StyleSheet } from 'react-native';
import { ColorScheme } from '../../types';

export const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    container: {
      width: 160,
      height: 160,
      borderRadius: 20,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 10,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.success + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    message: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
    },
    detail: {
      fontSize: 11,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 4,
    },
  });