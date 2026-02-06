import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { CheckoutItem } from '../../components/CheckoutItem/CheckoutItem';
import { formatCurrency } from '../../utils/formatCurrency';
import { createStyles } from './CheckoutScreen.style';
import { Props } from '../../navigation/props';

export const CheckoutScreen: React.FC = () => {
  const { colors } = useTheme();
  const { selectedItems, selectedSubtotal, selectedTotal, clearCart, removeFromCart } = useCart();
  const navigation = useNavigation<Props['navigation']>();
  const styles = createStyles(colors);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderItemCount, setOrderItemCount] = useState(0);

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePlaceOrder = () => {
    setOrderTotal(selectedTotal);
    setOrderItemCount(selectedItems.reduce((sum, item) => sum + item.quantity, 0));

    selectedItems.forEach((item) => {
      removeFromCart(item.product.id);
    });

    setOrderPlaced(true);
  };

  const handleContinueShopping = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  if (orderPlaced) {
    return (
      <View style={styles.container}>
        <View style={styles.successStepsContainer}>
          <View style={styles.step}>
            <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </View>
            <Text style={[styles.stepLabel, styles.stepLabelActive]}>Bag</Text>
          </View>
          <View style={[styles.stepLine, styles.stepLineActive]} />
          <View style={styles.step}>
            <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </View>
            <Text style={[styles.stepLabel, styles.stepLabelActive]}>Review</Text>
          </View>
          <View style={[styles.stepLine, styles.stepLineActive]} />
          <View style={styles.step}>
            <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </View>
            <Text style={[styles.stepLabel, styles.stepLabelActive]}>Done</Text>
          </View>
        </View>

        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Ionicons name="checkmark-circle" size={80} color={colors.success} />
          </View>
          <Text style={styles.successTitle}>Order Placed!</Text>
          <Text style={styles.successSubtitle}>
            Thank you for your purchase. Your order has been confirmed.
          </Text>
          <Text style={styles.successTotal}>{formatCurrency(orderTotal)}</Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueShopping}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Checkout</Text>
          <Text style={styles.subtitle}>Review your order</Text>
        </View>
      </View>

      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          </View>
          <Text style={[styles.stepLabel, styles.stepLabelActive]}>Bag</Text>
        </View>
        <View style={[styles.stepLine, styles.stepLineActive]} />
        <View style={styles.step}>
          <View style={[styles.stepCircle, styles.stepCircleActive]}>
            <Text style={[styles.stepNumber, styles.stepNumberActive]}>2</Text>
          </View>
          <Text style={[styles.stepLabel, styles.stepLabelActive]}>Review</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.step}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.stepLabel}>Done</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Order Items</Text>
            <Text style={styles.itemCount}>{selectedItems.reduce((sum, i) => sum + i.quantity, 0)} items</Text>
          </View>
          <View style={styles.itemsCard}>
            {selectedItems.map((item) => (
              <CheckoutItem key={item.product.id} item={item} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Summary</Text>
          </View>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatCurrency(selectedSubtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.discountRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountBadgeText}>FREE</Text>
                </View>
              </View>
              <Text style={[styles.summaryValue, { color: colors.success }]}>
                {formatCurrency(0)}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(selectedTotal)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.8}
        >
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};