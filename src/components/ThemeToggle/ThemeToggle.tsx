import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { createStyles } from './ThemeToggle.style';

export const ThemeToggle: React.FC = () => {
  const { theme, colors, toggleTheme } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Ionicons
        name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
        size={20}
        color={colors.text}
      />
    </TouchableOpacity>
  );
};