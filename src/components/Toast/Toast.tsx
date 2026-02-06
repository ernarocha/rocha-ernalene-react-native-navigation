import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { createStyles } from './Toast.style';

interface ToastProps {
  visible: boolean;
  message: string;
  detail?: string;
  duration?: number;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  detail,
  duration = 2000,
  onHide,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      // reset values before animating in
      opacity.setValue(0);
      scale.setValue(0.85);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // auto-dismiss after duration
      timerRef.current = setTimeout(() => {
        dismissToast();
      }, duration);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [visible]);

  const dismissToast = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.85,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={dismissToast}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={dismissToast}
      >
        <Animated.View
          style={[
            styles.container,
            { opacity, transform: [{ scale }] },
          ]}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={28} color={colors.success} />
          </View>
          <Text style={styles.message}>{message}</Text>
          {detail && <Text style={styles.detail} numberOfLines={2}>{detail}</Text>}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};