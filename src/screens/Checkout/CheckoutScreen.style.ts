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
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 16,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
    },
    backButton: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    headerContent: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.text,
    },
    subtitle: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 2,
    },
    stepsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 40,
      backgroundColor: colors.background,
    },
    successStepsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 120,
      paddingBottom: 20,
      paddingHorizontal: 40,
      backgroundColor: colors.background,
    },
    step: {
      alignItems: 'center',
    },
    stepCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border,
    },
    stepCircleActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    stepCircleCompleted: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    stepNumber: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    stepNumberActive: {
      color: '#FFFFFF',
    },
    stepLabel: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 6,
      fontWeight: '500',
    },
    stepLabelActive: {
      color: colors.primary,
      fontWeight: '600',
    },
    stepLine: {
      flex: 1,
      height: 2,
      backgroundColor: colors.border,
      marginHorizontal: 8,
    },
    stepLineActive: {
      backgroundColor: colors.primary,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 32,
    },
    section: {
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    itemCount: {
      fontSize: 13,
      color: colors.textSecondary,
      backgroundColor: colors.card,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    itemsCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 16,
    },
    summaryCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 20,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
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
    discountRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    discountBadge: {
      backgroundColor: colors.success + '20',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      marginLeft: 8,
    },
    discountBadgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.success,
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
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    totalValue: {
      fontSize: 26,
      fontWeight: '800',
      color: colors.primary,
    },
    securityNote: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    securityText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: 6,
    },
    footer: {
      backgroundColor: colors.background,
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 32,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    placeOrderButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 18,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeOrderButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    buttonIcon: {
      marginLeft: 10,
    },
    successContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    successIconContainer: {
      marginBottom: 24,
    },
    successTitle: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 12,
    },
    successSubtitle: {
      fontSize: 15,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: 24,
    },
    successTotal: {
      fontSize: 32,
      fontWeight: '800',
      color: colors.primary,
      marginBottom: 40,
    },
    continueButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      paddingVertical: 18,
      paddingHorizontal: 40,
    },
    continueButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
  });