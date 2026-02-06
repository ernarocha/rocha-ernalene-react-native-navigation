import React, { useEffect, useRef, memo } from 'react';
import { View, Text, TouchableOpacity, Modal, ImageSourcePropType, Animated } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { createStyles } from './DeleteConfirmModal.style';

interface DeleteConfirmModalProps {
  visible: boolean;
  mode: 'single' | 'multiple';
  product?: Product | null;
  count?: number;
  onConfirm: () => void;
  onCancel: () => void;
}

// memoized image component to prevent re-renders
const ModalImage = memo(({ source, style }: { source: ImageSourcePropType; style: object }) => (
  <Image source={source} style={style} contentFit="cover" cachePolicy="memory-disk" />
));

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  visible,
  mode,
  product,
  count,
  onConfirm,
  onCancel,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
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

  const handleCancel = () => {
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
      onCancel();
    });
  };

  const handleConfirm = () => {
    // animate out before confirming
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
      onConfirm();
    });
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.overlayBackground, { opacity: overlayOpacity }]}
        />
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={handleCancel}
        />
        <Animated.View
          style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
        >
          <View style={styles.handle} />

          <View style={styles.iconContainer}>
            <Ionicons name="trash-outline" size={48} color={colors.danger} />
          </View>

          <Text style={styles.title}>
            {mode === 'single' ? 'Remove Item?' : 'Remove Selected Items?'}
          </Text>

          {mode === 'single' && product ? (
            <View style={styles.productRow}>
              <View style={styles.imageContainer}>
                <ModalImage source={product.image} style={styles.image} />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.productCategory}>{product.category}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.description}>
              {count} {count === 1 ? 'item' : 'items'} will be removed from your bag
            </Text>
          )}

          <Text style={styles.warningText}>
            This action cannot be undone
          </Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Ionicons name="trash" size={20} color="#FFFFFF" />
            <Text style={styles.deleteButtonText}>
              Remove {mode === 'multiple' && count ? `(${count})` : ''}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};
