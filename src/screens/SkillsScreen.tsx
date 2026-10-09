import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useGame } from '../state/GameContext';
import { Card } from '../components/Card';
import { colors, spacing, fontSize, borderRadius } from '../theme';

export function SkillsScreen() {
  const game = useGame();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>✨ Keahlian</Text>
      <Text style={styles.subtitle}>Mastery saat ini: {game.player.mastery}</Text>
      {skillsData.map(skill => {
        const unlocked = game.player.mastery >= skill.masteryRequired;
        return (
          <Card key={skill.id} style={[styles.skillCard, !unlocked && styles.lockedCard]}>
            <View style={styles.skillHeader}>
              <Text style={styles.skillName}>{skill.name}</Text>
              {unlocked ? <Text style={styles.unlockedBadge}>Tersembunyi</Text> : <Text style={styles.lockedBadge}>Kunci</Text>}
            </View>
            <Text style={styles.skillDesc}>{skill.description}</Text>
            <View style={styles.skillMeta}>
              <Text style={styles.metaLabel}>Typ: {skill.type}</Text>
              <Text style={styles.metaLabel}>Power: {skill.power}</Text>
              <Text style={styles.metaLabel}>Mastery dibutuhkan: {skill.masteryRequired}</Text>
            </View>
            {!unlocked && <Text style={styles.lockedText}>Unlock dengan mastery {skill.masteryRequired}</Text>}
          </Card>
        );
      })}
    </ScrollView>
  );
}

const skillsData = [
  { id: 'slash', name: 'Treasure Slash', description: 'Serangan cepat dengan pedang.', masteryRequired: 0, power: 15, type: 'attack' as const },
  { id: 'charged_shot', name: 'Charged Shot', description: 'Ambil napas dan tembak pembunuh.', masteryRequired: 10, power: 25, type: 'attack' as const },
  { id: 'healing', name: 'Healing Light', description: 'Sembuhkan diri dengan cahaya suci.', masteryRequired: 5, power: 20, type: 'heal' as const },
  { id: 'barrier', name: 'Barrier', description: 'Kembang pertahanan selama 1 giliran.', masteryRequired: 8, power: 30, type: 'defense' as const },
];

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: colors.bg },
  title: { fontSize: fontSize.xxl, fontWeight: 'bold', color: colors.gold, marginBottom: spacing.sm },
  subtitle: { fontSize: fontSize.sm, color: colors.gray, marginBottom: spacing.md },
  skillCard: { backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.sm },
  lockedCard: { opacity: 0.7 },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  skillName: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.white },
  unlockedBadge: { fontSize: fontSize.xs, color: colors.green, backgroundColor: colors.green, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
  lockedBadge: { fontSize: fontSize.xs, color: colors.white, backgroundColor: colors.dark, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
  skillDesc: { color: colors.lightGray, fontSize: fontSize.sm, marginBottom: spacing.sm },
  skillMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  metaLabel: { fontSize: fontSize.xs, color: colors.gray },
  lockedText: { fontSize: fontSize.sm, color: colors.red, textAlign: 'center' },
});
