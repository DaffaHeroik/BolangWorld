import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface HPBarProps {
  current: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function HPBar({ current, max, size = 'md', style }: HPBarProps) {
  const pct = max > 0 ? Math.min(1, Math.max(0, current / max)) : 0;
  const width = size === 'sm' ? 120 : size === 'lg' ? 240 : 160;
  const showLabel = size === 'lg' || size === 'md';
  return (
    <View style={[styles.container, style]}>
      {showLabel && <Text style={styles.label}>{`${current} / ${max}`}</Text>}
      <View style={[styles.track, { width }]}>
        <View style={[styles.fill, { width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  label: { color: colors.lightGray, fontSize: fontSize.sm, marginBottom: spacing.xs },
  track: { height: 10, backgroundColor: colors.dark, borderRadius: borderRadius.full, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.green, borderRadius: borderRadius.full },
});
