import { StyleSheet, Dimensions } from 'react-native';
import { ColorScheme } from '../../types';

const { width } = Dimensions.get('window');

export const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingTop: 50,
      paddingBottom: 20,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      flex: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: 1,
    },
    itemCount: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    selectAllRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 12,
    },
    selectAllButton: {
      flexDirection: 'row',
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
      marginRight: 10,
    },
    checkboxChecked: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    selectAllText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    selectedCount: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    selectAllRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    trashButton: {
      marginLeft: 12,
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: colors.danger + '15',
      justifyContent: 'center',
      alignItems: 'center',
    },
    shippingProgress: {
      marginTop: 20,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
    },
    progressBarBg: {
      height: 6,
      backgroundColor: colors.border,
      borderRadius: 3,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 3,
    },
    shippingText: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 10,
      textAlign: 'center',
    },
    shippingHighlight: {
      color: colors.primary,
      fontWeight: '600',
    },
    listContent: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 16,
    },
    footer: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      padding: 24,
      paddingBottom: 32,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    summaryLabel: {
      fontSize: 15,
      color: colors.textSecondary,
    },
    summaryValue: {
      fontSize: 15,
      color: colors.text,
      fontWeight: '500',
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 16,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    totalValue: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.primary,
    },
    checkoutButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: 'center',
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    checkoutButtonDisabled: {
      opacity: 0.4,
    },
    checkoutButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    checkoutArrow: {
      marginLeft: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyIconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 15,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: 32,
      paddingHorizontal: 20,
    },
    shopButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 40,
    },
    shopButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
  });