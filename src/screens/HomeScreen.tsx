import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useGame } from '../state/GameContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { colors, spacing, fontSize, borderRadius } from '../theme';

export function HomeScreen() {
  const game = useGame();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>LOKAVERSE</Text>
        <Text style={styles.subtitle}>Era Petualangan</Text>
      </View>
      <Card style={styles.playerCard}>
        <View style={styles.playerHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🗡️</Text>
          </View>
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{game.player.name}</Text>
            <Text style={styles.playerTitle}>Petualang Muda</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Level</Text>
            <Text style={styles.statValue}>{game.player.level}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>HP</Text>
            <Text style={styles.statValue}>{game.player.hp}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>XP</Text>
            <Text style={styles.statValue}>{game.player.xp}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>🪙</Text>
            <Text style={styles.statValue}>{game.player.currency}</Text>
          </View>
        </View>
      </Card>
      <Text style={styles.sectionTitle}>Aksi Cepat</Text>
      <Card style={styles.actionRow}>
        <Button title="🌍 Jelajahi" onPress={() => game.selectZone('meadow')} />
        <Button title="🏠 Beranda" onPress={() => {}} variant="secondary" />
      </Card>
      <Card style={styles.actionRow}>
        <Button title="🎒 Inventaris" onPress={() => {}} variant="secondary" />
        <Button title="✨ Keahlian" onPress={() => {}} variant="secondary" />
      </Card>
      <Card style={styles.notice}>
        <Text style={styles.noticeText}>Fitur PvP adalah demo dan tidak terhubung ke pemain nyata.</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: colors.bg },
  header: { marginBottom: spacing.lg, textAlign: 'center' },
  title: { fontSize: fontSize.hero, fontWeight: '800', color: colors.gold, letterSpacing: 2 },
  subtitle: { fontSize: fontSize.md, color: colors.gray, marginTop: spacing.xs },
  playerCard: { backgroundColor: colors.cardBg, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md },
  playerHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  avatarText: { fontSize: 32 },
  playerInfo: { flex: 1 },
  playerName: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.white },
  playerTitle: { fontSize: fontSize.sm, color: colors.gray },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: spacing.sm },
  stat: { alignItems: 'center' },
  statLabel: { fontSize: fontSize.xs, color: colors.gray },
  statValue: { fontSize: fontSize.md, fontWeight: 'bold', color: colors.white },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.lightGray, marginBottom: spacing.sm, marginTop: spacing.sm },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm, gap: spacing.sm },
  notice: { backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: borderRadius.md, borderLeftColor: colors.gold, borderLeftWidth: 4 },
  noticeText: { color: colors.lightGray, fontSize: fontSize.sm, textAlign: 'center' },
});
