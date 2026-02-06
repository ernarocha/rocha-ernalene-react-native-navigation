import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { AddToBagModal } from '../AddToBagModal/AddToBagModal';
import { Toast } from '../Toast/Toast';
import { createStyles } from './ProductCard.style';
import { Props } from '../../navigation/props';

interface ProductCardProps {
  product: Product;
}

// memoized image component to prevent re-renders
const ProductImage = memo(({ source, style }: { source: ImageSourcePropType; style: object }) => (
  <Image source={source} style={style} contentFit="cover" cachePolicy="memory-disk" />
));

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const navigation = useNavigation<Props['navigation']>();
  const styles = createStyles(colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastDetail, setToastDetail] = useState('');

  const handlePress = () => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  const handleAddToCart = () => {
    setModalVisible(true);
  };

  const handleConfirmAdd = (quantity: number) => {
    addToCart(product, quantity);
    setModalVisible(false);
    setToastDetail(`${quantity}x ${product.name}`);
    setToastVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={styles.imageContainer}>
          <ProductImage source={product.image} style={styles.image} />
        </View>
        <View style={styles.content}>
          <View style={styles.topContent}>
            <Text style={styles.categoryText}>{product.category}</Text>
            <Text style={styles.name} numberOfLines={2}>
              {product.name}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <Ionicons name="bag-add-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <AddToBagModal
        visible={modalVisible}
        product={product}
        onConfirm={handleConfirmAdd}
        onClose={() => setModalVisible(false)}
      />

      <Toast
        visible={toastVisible}
        message="Added to Bag"
        detail={toastDetail}
        onHide={() => setToastVisible(false)}
      />
    </>
  );
};