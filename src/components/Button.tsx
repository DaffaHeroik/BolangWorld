import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ title, onPress, variant = 'primary', disabled = false, style, textStyle }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'danger' && styles.danger,
        variant === 'ghost' && styles.ghost,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      disabled={disabled}
    >
      <Text style={[styles.text, variant === 'ghost' && styles.ghostText, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center', minHeight: 44 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.cardBg, borderWidth: 1, borderColor: colors.lightGray },
  danger: { backgroundColor: colors.red },
  ghost: { backgroundColor: 'transparent' },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.85 },
  text: { color: colors.white, fontSize: fontSize.md, fontWeight: '600' },
  ghostText: { color: colors.lightGray },
});
