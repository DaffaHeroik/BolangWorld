import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useGame } from '../state/GameContext';
import { Card } from '../components/Card';
import { colors, spacing, fontSize, borderRadius } from '../theme';

export function InventoryScreen() {
  const game = useGame();
  const items = game.player.inventory
    .map(inv => {
      const item = game.getItem(inv.itemId);
      return item ? { ...item, quantity: inv.quantity } : null;
    })
    .filter(Boolean) as { id: string; name: string; rarity: string; description: string; icon: string; quantity: number }[];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎒 Inventaris</Text>
      {items.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>Inventaris kosong.</Text>
          <Text style={styles.emptyText}>Kemenangan melawan musuh akan memberi hadiah.</Text>
        </Card>
      ) : (
        items.map(item => (
          <Card key={item.id} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemIcon}>{item.icon}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.rarityRow}>
                  <View style={[styles.rarityBadge, { backgroundColor: item.rarity === 'common' ? colors.dark : item.rarity === 'rare' ? colors.primary : colors.gold }]} />
                  <Text style={styles.rarityLabel}>{item.rarity}</Text>
                </View>
              </View>
              <Text style={styles.quantity}>x{item.quantity}</Text>
            </View>
            <Text style={styles.itemDesc}>{item.description}</Text>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: colors.bg },
  title: { fontSize: fontSize.xxl, fontWeight: 'bold', color: colors.gold, marginBottom: spacing.md },
  emptyCard: { backgroundColor: colors.cardBg, padding: spacing.lg, borderRadius: borderRadius.md, alignItems: 'center' },
  emptyText: { color: colors.gray, textAlign: 'center', marginVertical: spacing.sm },
  itemCard: { backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.sm },
  itemHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  itemIcon: { fontSize: 32, marginRight: spacing.md },
  itemInfo: { flex: 1 },
  itemName: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.white },
  rarityRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs },
  rarityBadge: { width: 8, height: 8, borderRadius: 4, marginRight: spacing.xs },
  rarityLabel: { fontSize: fontSize.xs, color: colors.gray },
  quantity: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.gold },
  itemDesc: { fontSize: fontSize.sm, color: colors.lightGray },
});
