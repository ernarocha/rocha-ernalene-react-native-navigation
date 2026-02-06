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
      paddingBottom: 16,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.primary,
      letterSpacing: 3,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    iconButton: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badge: {
      position: 'absolute',
      right: -4,
      top: -4,
      minWidth: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 6,
      borderWidth: 2,
      borderColor: colors.background,
    },
    badgeText: {
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '700',
    },
    greeting: {
      marginBottom: 12,
    },
    greetingName: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
    },
    categoriesContainer: {
      paddingRight: 10,
      marginBottom: 8,
    },
    categoryPill: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 25,
      backgroundColor: colors.card,
      marginRight: 10,
    },
    categoryPillActive: {
      backgroundColor: colors.primary,
    },
    categoryText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    categoryTextActive: {
      color: '#FFFFFF',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    seeAllText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 24,
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
  });