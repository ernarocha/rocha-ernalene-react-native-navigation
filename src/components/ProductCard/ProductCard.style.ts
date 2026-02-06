import { StyleSheet, Dimensions } from 'react-native';
import { ColorScheme } from '../../types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 2;
const CARD_HEIGHT = 285;

export const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      marginBottom: 12,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 8,
    },
    imageContainer: {
      width: '100%',
      height: 160,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.border,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    content: {
      flex: 1,
      paddingTop: 8,
      paddingHorizontal: 2,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    topContent: {
    },
    categoryText: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    name: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
      lineHeight: 18,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    price: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
    },
    addButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });