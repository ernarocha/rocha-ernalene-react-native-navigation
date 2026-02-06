import { StyleSheet } from 'react-native';
import { ColorScheme } from '../../types';

export const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 14,
      marginBottom: 14,
      alignItems: 'center',
    },
    checkboxContainer: {
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.textSecondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    imageContainer: {
      width: 90,
      height: 90,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: colors.border,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    content: {
      flex: 1,
      marginLeft: 14,
      justifyContent: 'space-between',
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    info: {
      flex: 1,
      marginRight: 8,
    },
    name: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
      lineHeight: 20,
    },
    unitPrice: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    removeButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    subtotal: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.primary,
    },
  });