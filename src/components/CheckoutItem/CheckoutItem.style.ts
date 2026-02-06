import { StyleSheet } from 'react-native';
import { ColorScheme } from '../../types';

export const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastItem: {
      borderBottomWidth: 0,
    },
    imageContainer: {
      width: 56,
      height: 56,
      borderRadius: 14,
      overflow: 'hidden',
      backgroundColor: colors.background,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 14,
    },
    info: {
      flex: 1,
    },
    name: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    priceDetails: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    quantityBadge: {
      backgroundColor: colors.primary + '15',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      marginRight: 12,
    },
    quantityText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.primary,
    },
    subtotal: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
      minWidth: 70,
      textAlign: 'right',
    },
  });