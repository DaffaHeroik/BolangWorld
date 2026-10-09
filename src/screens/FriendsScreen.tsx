import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { colors, spacing, fontSize, borderRadius } from '../theme';

const friends = [
  { name: 'Rina Aurelia', avatar: '👸', level: 12, status: 'Online' },
  { name: 'Bayu Pratama', avatar: '🧙', level: 8, status: 'Offline' },
  { name: 'Sari Dewi', avatar: '🧝', level: 15, status: 'Online' },
  { name: 'Khan Teguh', avatar: '⚔️', level: 10, status: 'Offline' },
];

export function FriendsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👥 Teman</Text>
      <Card style={styles.noticeCard}>
        <Text style={styles.notice}>Demo only — tidak ada pemain online yang terhubung.</Text>
      </Card>
      {friends.map((friend, i) => (
        <Card key={i} style={styles.friendCard}>
          <View style={styles.friendAvatar}>
            <Text style={styles.avatarText}>{friend.avatar}</Text>
          </View>
          <View style={styles.friendInfo}>
            <Text style={styles.friendName}>{friend.name}</Text>
            <View style={styles.friendMeta}>
              <Text style={styles.metaText}>Level {friend.level}</Text>
              <View style={[styles.statusDot, { backgroundColor: friend.status === 'Online' ? colors.green : colors.gray }]} />
              <Text style={[styles.metaText, { color: friend.status === 'Online' ? colors.green : colors.gray }]}>{friend.status}</Text>
            </View>
          </View>
          <Button title="Tantangan" onPress={() => {}} variant="ghost" disabled />
        </Card>
      ))}
      <Text style={styles.sectionTitle}>Fitur Online Akan Datang</Text>
      <Text style={styles.desc}>PvP online dan sistem teman nyata akan ditambahkan di update mendatang.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md, backgroundColor: colors.bg },
  title: { fontSize: fontSize.xxl, fontWeight: 'bold', color: colors.gold, marginBottom: spacing.md },
  noticeCard: { backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.md, borderLeftColor: colors.red, borderLeftWidth: 4 },
  notice: { color: colors.red, fontSize: fontSize.sm, fontWeight: '600' },
  friendCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.sm },
  friendAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  avatarText: { fontSize: 28 },
  friendInfo: { flex: 1 },
  friendName: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.white },
  friendMeta: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs },
  metaText: { fontSize: fontSize.sm, color: colors.gray, marginRight: spacing.sm },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: spacing.xs },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.lightGray, marginTop: spacing.md, marginBottom: spacing.sm },
  desc: { color: colors.gray, fontSize: fontSize.sm },
});
