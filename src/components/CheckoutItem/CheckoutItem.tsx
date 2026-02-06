import React, { memo } from 'react';
import { View, Text, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import { CartItem } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { createStyles } from './CheckoutItem.style';

interface CheckoutItemProps {
  item: CartItem;
}

// memoized image component to prevent re-renders
const ItemImage = memo(({ source, style }: { source: ImageSourcePropType; style: object }) => (
  <Image source={source} style={style} contentFit="cover" cachePolicy="memory-disk" />
));

export const CheckoutItem: React.FC<CheckoutItemProps> = ({ item }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const subtotal = item.product.price * item.quantity;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ItemImage source={item.product.image} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {item.product.name}
          </Text>
          <Text style={styles.priceDetails}>
            {formatCurrency(item.product.price)}
          </Text>
        </View>
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityText}>x{item.quantity}</Text>
        </View>
        <Text style={styles.subtotal}>{formatCurrency(subtotal)}</Text>
      </View>
    </View>
  );
};