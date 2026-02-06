import React, { useState, useEffect, useRef, memo } from 'react';
import { View, Text, TouchableOpacity, Modal, ImageSourcePropType, Animated } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { createStyles } from './AddToBagModal.style';

interface AddToBagModalProps {
  visible: boolean;
  product: Product | null;
  onConfirm: (quantity: number) => void;
  onClose: () => void;
}

// memoized image component to prevent re-renders
const ModalImage = memo(({ source, style }: { source: ImageSourcePropType; style: object }) => (
  <Image source={source} style={style} contentFit="cover" cachePolicy="memory-disk" />
));

export const AddToBagModal: React.FC<AddToBagModalProps> = ({
  visible,
  product,
  onConfirm,
  onClose,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [quantity, setQuantity] = useState(1);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      // fade in overlay and slide up sheet simultaneously
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleConfirm = () => {
    onConfirm(quantity);
    setQuantity(1);
  };

  const handleClose = () => {
    // animate out before closing
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setQuantity(1);
      onClose();
    });
  };

  if (!product) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.overlayBackground, { opacity: overlayOpacity }]}
        />
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleClose}
        />
        <Animated.View
          style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
        >
          <View style={styles.handle} />

          <View style={styles.productRow}>
            <View style={styles.imageContainer}>
              <ModalImage source={product.image} style={styles.image} />
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productCategory}>{product.category}</Text>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
            </View>
          </View>

          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Select Quantity</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecrement}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncrement}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotalValue}>
              {formatCurrency(product.price * quantity)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Ionicons name="bag-add-outline" size={22} color="#FFFFFF" />
            <Text style={styles.addButtonText}>
              Add {quantity} to Bag
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};