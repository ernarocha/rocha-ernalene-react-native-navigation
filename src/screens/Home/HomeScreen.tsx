import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { PRODUCTS } from '../../constants/products';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';
import { createStyles } from './HomeScreen.style';
import { Props } from '../../navigation/props';

// derive unique categories from the product list
const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

export const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const { totalItems } = useCart();
  const navigation = useNavigation<Props['navigation']>();
  const styles = createStyles(colors);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleGoToCart = () => {
    navigation.navigate('Main', { screen: 'Cart' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>GLOW</Text>
          </View>
          <View style={styles.headerActions}>
            <ThemeToggle />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleGoToCart}
              activeOpacity={0.7}
            >
              <Ionicons name="bag-outline" size={22} color={colors.text} />
              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {totalItems > 99 ? '99+' : totalItems}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.greeting}>
              <Text style={styles.greetingName}>Discover your Glow</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryPill,
                    activeCategory === category && styles.categoryPillActive,
                  ]}
                  onPress={() => setActiveCategory(category)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      activeCategory === category && styles.categoryTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Products</Text>
            </View>
          </>
        }
      />
    </View>
  );
};