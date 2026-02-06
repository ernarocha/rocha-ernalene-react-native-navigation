import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../constants/products';

const CART_STORAGE_KEY = '@glow_cart';

// serializable cart item for asyncstorage (stores product id instead of full object)
interface SerializedCartItem {
  productId: string;
  quantity: number;
  selected: boolean;
}

interface CartContextType {
  items: CartItem[];
  selectedIds: Set<string>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  toggleSelection: (productId: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  removeSelected: () => void;
  clearCart: () => void;
  isReady: boolean;
  totalItems: number;
  selectedItems: CartItem[];
  selectedSubtotal: number;
  selectedTotal: number;
  subtotal: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isReady, setIsReady] = useState(false);

  // load cart from asyncstorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const serialized: SerializedCartItem[] = JSON.parse(stored);
          const restoredItems: CartItem[] = [];
          const restoredSelected = new Set<string>();

          serialized.forEach((s) => {
            const product = PRODUCTS.find((p) => p.id === s.productId);
            if (product) {
              restoredItems.push({ product, quantity: s.quantity });
              if (s.selected) {
                restoredSelected.add(s.productId);
              }
            }
          });

          setItems(restoredItems);
          setSelectedIds(restoredSelected);
        }
      } catch {
        // silent fail on storage read
      } finally {
        setIsReady(true);
      }
    };

    loadCart();
  }, []);

  // persist cart to asyncstorage whenever items or selections change
  useEffect(() => {
    if (!isReady) return;

    const persist = async () => {
      try {
        const serialized: SerializedCartItem[] = items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          selected: selectedIds.has(item.product.id),
        }));
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serialized));
      } catch {
        // silent fail on storage write
      }
    };

    persist();
  }, [items, selectedIds, isReady]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    // auto-select newly added items
    setSelectedIds((prev) => new Set(prev).add(product.id));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  }, []);

  const incrementQuantity = useCallback((productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decrementQuantity = useCallback((productId: string) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === productId);
      if (existingItem && existingItem.quantity === 1) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }, []);

  const toggleSelection = useCallback((productId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(items.map((item) => item.product.id)));
  }, [items]);

  const deselectAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setSelectedIds(new Set());
  }, []);

  const removeSelected = useCallback(() => {
    setItems((prev) => prev.filter((item) => !selectedIds.has(item.product.id)));
    setSelectedIds(new Set());
  }, [selectedIds]);

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  const total = useMemo(() => {
    return subtotal;
  }, [subtotal]);

  const selectedItems = useMemo(() => {
    return items.filter((item) => selectedIds.has(item.product.id));
  }, [items, selectedIds]);

  const selectedSubtotal = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [selectedItems]);

  const selectedTotal = useMemo(() => {
    return selectedSubtotal;
  }, [selectedSubtotal]);

  const value = useMemo(() => ({
    items,
    selectedIds,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    toggleSelection,
    selectAll,
    deselectAll,
    removeSelected,
    clearCart,
    isReady,
    totalItems,
    selectedItems,
    selectedSubtotal,
    selectedTotal,
    subtotal,
    total,
  }), [items, selectedIds, addToCart, removeFromCart, incrementQuantity, decrementQuantity, toggleSelection, selectAll, deselectAll, removeSelected, clearCart, isReady, totalItems, selectedItems, selectedSubtotal, selectedTotal, subtotal, total]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};