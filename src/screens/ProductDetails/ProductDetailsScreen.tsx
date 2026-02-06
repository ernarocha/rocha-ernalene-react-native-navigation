import React, { memo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { PRODUCTS } from '../../constants/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { AddToBagModal } from '../../components/AddToBagModal/AddToBagModal';
import { Toast } from '../../components/Toast/Toast';
import { createStyles } from './ProductDetailsScreen.style';
import { Props } from '../../navigation/props';

// memoized image component to prevent re-renders
const ProductImage = memo(({ source, style }: { source: ImageSourcePropType; style: object }) => (
  <Image source={source} style={style} contentFit="cover" cachePolicy="memory-disk" />
));

const FEATURES = [
  { icon: 'leaf-outline', text: 'Organic' },
  { icon: 'water-outline', text: 'Hydrating' },
  { icon: 'shield-checkmark-outline', text: 'Dermatologist Tested' },
  { icon: 'sparkles-outline', text: 'Vegan' },
];

export const ProductDetailsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<RouteProp<{ ProductDetails: { productId: string } }, 'ProductDetails'>>();
  const styles = createStyles(colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastDetail, setToastDetail] = useState('');

  const { productId } = route.params;
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return null;
  }

  const handleBack = () => {
    navigation.goBack();
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
    <View style={styles.container}>
      <View style={styles.floatingHeader}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <ProductImage source={product.image} style={styles.image} />
          <View style={styles.imagePagination}>
            <View style={[styles.paginationDot, styles.paginationDotActive]} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.categoryRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
          </View>

          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            <Text style={styles.priceNote}>per item</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresGrid}>
              {FEATURES.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name={feature.icon as any} size={18} color={colors.primary} />
                  <Text style={styles.featureText}>{feature.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.footerPrice}>{formatCurrency(product.price)}</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="bag-add-outline" size={22} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add to Bag</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    </View>
  );
};