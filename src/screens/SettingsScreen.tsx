import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useGame } from '../state/GameContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { colors, spacing, fontSize, borderRadius } from '../theme';

export function SettingsScreen() {
  const game = useGame();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⚙️ Pengaturan</Text>
      <Card style={styles.card}>
        <Text style={styles.section}>Tentang</Text>
        <Text style={styles.info}>LOKAVERSE v1.0.0</Text>
        <Text style={styles.info}>Era Petualangan Offline</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.section}>Progres</Text>
        <Button title="Reset Progres Demo" onPress={() => Alert.alert('Reset Progres', 'Apakah Anda yakin ingin mereset semua progres? Tindakan ini tidak dapat dibatalkan.', [
          { text: 'Batal', style: 'cancel' },
          { text: 'Reset', style: 'destructive', onPress: () => game.resetProgress() },
        ])} variant="danger" />
      </Card>
      <Card style={styles.card}>
        <Text style={styles.section}>Catatan</Text>
        <Text style={styles.info}>Progres disimpan dalam memori. Segera setelah aplikasi ditutup, progres akan hilang.</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: colors.bg },
  title: { fontSize: fontSize.xxl, fontWeight: 'bold', color: colors.gold, marginBottom: spacing.md },
  card: { backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.md },
  section: { fontSize: fontSize.md, fontWeight: 'bold', color: colors.white, marginBottom: spacing.sm },
  info: { fontSize: fontSize.sm, color: colors.gray, marginBottom: spacing.xs },
});
