import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { CartItem as CartItemType } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { QuantityControl } from '../QuantityControl/QuantityControl';
import { DeleteConfirmModal } from '../DeleteConfirmModal/DeleteConfirmModal';
import { createStyles } from './CartItem.style';

interface CartItemProps {
  item: CartItemType;
  selected: boolean;
  onToggleSelect: () => void;
  onPress: () => void;
}

// memoized image component to prevent re-renders
const ItemImage = memo(({ source, style }: { source: ImageSourcePropType; style: object }) => (
  <Image source={source} style={style} contentFit="cover" cachePolicy="memory-disk" />
));

export const CartItem: React.FC<CartItemProps> = ({ item, selected, onToggleSelect, onPress }) => {
  const { colors } = useTheme();
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  const styles = createStyles(colors);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const subtotal = item.product.price * item.quantity;

  const handleRemovePress = () => {
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    removeFromCart(item.product.id);
    setDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={onToggleSelect}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, selected && styles.checkboxChecked]}>
          {selected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <ItemImage source={item.product.image} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.info}
            onPress={onPress}
            activeOpacity={0.8}
          >
            <Text style={styles.name} numberOfLines={1}>
              {item.product.name}
            </Text>
            <Text style={styles.unitPrice}>
              {formatCurrency(item.product.price)} each
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemovePress}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={18} color={colors.danger} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow}>
          <QuantityControl
            quantity={item.quantity}
            onIncrement={() => incrementQuantity(item.product.id)}
            onDecrement={() => decrementQuantity(item.product.id)}
          />
          <Text style={styles.subtotal}>{formatCurrency(subtotal)}</Text>
        </View>
      </View>

      <DeleteConfirmModal
        visible={deleteModalVisible}
        mode="single"
        product={item.product}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </View>
  );
};