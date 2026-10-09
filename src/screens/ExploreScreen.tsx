import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useGame } from '../state/GameContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { HPBar } from '../components/HPBar';
import { colors, spacing, fontSize, borderRadius } from '../theme';

export function ExploreScreen() {
  const game = useGame();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌍 Jelajahi</Text>
      {zones.map(zone => {
        const creatures = game.getCreaturesByZone(zone.id);
        const canEnter = game.player.level >= zone.recommendedLevel;
        return (
          <Card key={zone.id} style={styles.zoneCard} onPress={() => canEnter && game.selectZone(zone.id)}>
            <View style={styles.zoneHeader}>
              <Text style={styles.zoneName}>{zone.name}</Text>
              {!canEnter && <Text style={styles.recommendedBadges}>🔒 Level {zone.recommendedLevel}</Text>}
            </View>
            <Text style={styles.zoneDesc}>{zone.description}</Text>
            <View style={styles.creatureRow}>
              <Text style={styles.label}>Level: {zone.recommendedLevel}</Text>
              <Text style={styles.label}>Makhluk: {creatures.map(c => c.name).join(', ')}</Text>
            </View>
            <Button title={canEnter ? 'Masuk' : 'Tidak cukup level'} onPress={() => canEnter && game.selectZone(zone.id)} disabled={!canEnter} variant="secondary" style={styles.btn} />
            {canEnter && (
              <ScrollView horizontal contentContainerStyle={styles.creatureList}>
                {creatures.map(creature => (
                  <Card key={creature.id} style={styles.creatureCard} onPress={() => game.selectCreature(creature.id)}>
                    <Text style={styles.creatureName}>{creature.name}</Text>
                    <HPBar current={creature.maxHp} max={creature.maxHp} size="sm" style={styles.hpSm} />
                    <Text style={styles.creatureStats}>Level {creature.level} · Damage {creature.attack}</Text>
                  </Card>
                ))}
              </ScrollView>
            )}
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: colors.bg },
  title: { fontSize: fontSize.xxl, fontWeight: 'bold', color: colors.gold, marginBottom: spacing.md },
  zoneCard: { marginBottom: spacing.md },
  zoneHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  zoneName: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.white },
  recommendedBadges: { fontSize: fontSize.sm, color: colors.red },
  zoneDesc: { color: colors.lightGray, fontSize: fontSize.sm, marginVertical: spacing.sm },
  creatureRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: spacing.xs },
  label: { color: colors.gray, fontSize: fontSize.xs },
  btn: { marginTop: spacing.sm },
  creatureList: { marginTop: spacing.sm, paddingRight: spacing.sm },
  creatureCard: { padding: spacing.sm, width: 140, backgroundColor: colors.cardBg, marginRight: spacing.sm },
  creatureName: { fontSize: fontSize.md, fontWeight: 'bold', color: colors.white },
  hpSm: { marginVertical: spacing.xs },
  creatureStats: { fontSize: fontSize.xs, color: colors.gray },
});
