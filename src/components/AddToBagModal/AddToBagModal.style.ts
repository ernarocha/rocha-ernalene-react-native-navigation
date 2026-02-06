import { StyleSheet, Dimensions } from 'react-native';
import { ColorScheme } from '../../types';

const { width } = Dimensions.get('window');

export const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    overlayBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    overlayTouchable: {
      flex: 1,
    },
    container: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 36,
    },
    handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.border,
      alignSelf: 'center',
      marginBottom: 20,
    },
    productRow: {
      flexDirection: 'row',
      marginBottom: 24,
    },
    imageContainer: {
      width: 80,
      height: 80,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: colors.card,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    productInfo: {
      flex: 1,
      marginLeft: 16,
      justifyContent: 'center',
    },
    productName: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    productCategory: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 6,
    },
    productPrice: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.primary,
    },
    quantitySection: {
      alignItems: 'center',
      marginBottom: 24,
    },
    quantityLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 14,
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 16,
      overflow: 'hidden',
    },
    quantityButton: {
      width: 52,
      height: 52,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityButtonText: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.primary,
    },
    quantityValue: {
      minWidth: 56,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    subtotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 4,
    },
    subtotalLabel: {
      fontSize: 15,
      color: colors.textSecondary,
    },
    subtotalValue: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.text,
    },
    addButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 18,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
      marginLeft: 8,
    },
    cancelButton: {
      alignItems: 'center',
      paddingVertical: 14,
      marginTop: 8,
    },
    cancelButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.textSecondary,
    },
  });