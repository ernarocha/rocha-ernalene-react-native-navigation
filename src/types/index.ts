import { ImageSourcePropType } from 'react-native';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
  category: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ThemeMode = 'light' | 'dark';

export interface ColorScheme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  accent: string;
  border: string;
  success: string;
  danger: string;
}