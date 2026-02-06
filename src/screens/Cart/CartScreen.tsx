import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from '../../components/CartItem/CartItem';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';
import { DeleteConfirmModal } from '../../components/DeleteConfirmModal/DeleteConfirmModal';
import { formatCurrency } from '../../utils/formatCurrency';
import { createStyles } from './CartScreen.style';
import { Props } from '../../navigation/props';

export const CartScreen: React.FC = () => {
  const { colors } = useTheme();
  const {
    items,
    totalItems,
    selectedIds,
    selectedItems,
    selectedSubtotal,
    selectedTotal,
    toggleSelection,
    selectAll,
    deselectAll,
    removeSelected,
  } = useCart();
  const navigation = useNavigation<Props['navigation']>();
  const styles = createStyles(colors);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const allSelected = items.length > 0 && selectedIds.size === items.length;

  const handleToggleAll = () => {
    if (allSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  };

  const handleRemoveSelected = () => {
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    removeSelected();
    setDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const handleStartShopping = () => {
    navigation.dispatch(CommonActions.navigate({ name: 'Home' }));
  };

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>My Bag</Text>
              <Text style={styles.itemCount}>0 items</Text>
            </View>
            <ThemeToggle />
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="bag-outline" size={48} color={colors.textSecondary} />
          </View>
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you have not added anything to your bag yet. Start shopping to fill it up!
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={handleStartShopping}
            activeOpacity={0.8}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>My Bag</Text>
            <Text style={styles.itemCount}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </Text>
          </View>
          <ThemeToggle />
        </View>
      </View>

      <View style={styles.selectAllRow}>
        <TouchableOpacity
          style={styles.selectAllButton}
          onPress={handleToggleAll}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, allSelected && styles.checkboxChecked]}>
            {allSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
          </View>
          <Text style={styles.selectAllText}>
            {allSelected ? 'Deselect All' : 'Select All'}
          </Text>
        </TouchableOpacity>
        <View style={styles.selectAllRight}>
          <Text style={styles.selectedCount}>
            {selectedIds.size} selected
          </Text>
          {selectedIds.size > 0 && (
            <TouchableOpacity
              style={styles.trashButton}
              onPress={handleRemoveSelected}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={20} color={colors.danger} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            selected={selectedIds.has(item.product.id)}
            onToggleSelect={() => toggleSelection(item.product.id)}
            onPress={() => handleProductPress(item.product.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal ({selectedItems.length} items)</Text>
          <Text style={styles.summaryValue}>{formatCurrency(selectedSubtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={[styles.summaryValue, { color: colors.success }]}>Free</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(selectedTotal)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.checkoutButton, selectedIds.size === 0 && styles.checkoutButtonDisabled]}
          onPress={handleCheckout}
          activeOpacity={0.8}
          disabled={selectedIds.size === 0}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>

      <DeleteConfirmModal
        visible={deleteModalVisible}
        mode="multiple"
        count={selectedIds.size}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </View>
  );
};