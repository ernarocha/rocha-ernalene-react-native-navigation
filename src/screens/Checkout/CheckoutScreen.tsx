import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, StackActions, CommonActions } from '@react-navigation/native';
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

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePlaceOrder = () => {
    const total = selectedTotal;
    const itemCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

    selectedItems.forEach((item) => {
      removeFromCart(item.product.id);
    });

    setOrderPlaced(true);

    Alert.alert(
      'Order Placed!',
      `Thank you for your purchase of ${itemCount} item${itemCount !== 1 ? 's' : ''} totaling ${formatCurrency(total)}. Your order has been confirmed.`,
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.dispatch(StackActions.popToTop());
            navigation.dispatch(
              CommonActions.navigate({ name: 'Main', params: { screen: 'Home' } })
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (orderPlaced) {
    return <View style={[styles.container, { backgroundColor: colors.background }]} />;
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