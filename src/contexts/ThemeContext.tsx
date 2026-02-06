import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorScheme, ThemeMode } from '../types';
import { lightColors, darkColors } from '../constants/colors';

const THEME_STORAGE_KEY = '@glow_theme';

interface ThemeContextType {
  theme: ThemeMode;
  colors: ColorScheme;
  toggleTheme: () => void;
  isReady: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [isReady, setIsReady] = useState(false);

  // load theme from asyncstorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') {
          setTheme(stored);
        }
      } catch {
        // silent fail on storage read
      } finally {
        setIsReady(true);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      // persist theme preference
      AsyncStorage.setItem(THEME_STORAGE_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  const colors = useMemo(() => {
    return theme === 'light' ? lightColors : darkColors;
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    colors,
    toggleTheme,
    isReady,
  }), [theme, colors, toggleTheme, isReady]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};