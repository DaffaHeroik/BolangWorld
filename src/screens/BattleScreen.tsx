import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useGame } from '../state/GameContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { HPBar } from '../components/HPBar';
import { colors, spacing, fontSize, borderRadius } from '../theme';

export function BattleScreen() {
  const game = useGame();
  const battle = game.battle;
  const skills = skillsData;

  if (!battle) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyTitle}>Belum ada pertarungan</Text>
        <Text style={styles.emptyDesc}>Pilih makhluk dari Jelajahi untuk memulai.</Text>
      </View>
    );
  }

  const playerMaxHp = battle.playerMaxHp;
  const enemyMaxHp = battle.enemyMaxHp;
  const canAct = battle.status === 'active';
  const selectedSkill = game.selectedSkillId ? skills.find(s => s.id === game.selectedSkillId) : null;
  const canUseSkill = selectedSkill && battle.status === 'active' && game.player.mastery >= selectedSkill.masteryRequired;

  const handleUseSkill = () => {
    if (canUseSkill) game.playerAction('skill');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⚔️ Pertarungan</Text>

      <Card style={styles.battleCard}>
        <View style={styles.combatant}>
          <Text style={styles.name}>{battle.playerName}</Text>
          <HPBar current={battle.playerHp} max={playerMaxHp} size="md" style={styles.hp} />
        </View>
        <View style={styles.vs}><Text style={styles.vsText}>VS</Text></View>
        <View style={styles.combatant}>
          <Text style={[styles.name, styles.enemyName]}>{battle.activeCreatureName}</Text>
          <HPBar current={battle.enemyHp} max={enemyMaxHp} size="md" style={styles.hp} />
        </View>
      </Card>

      <Card style={styles.logCard}>
        <Text style={styles.logTitle}>Catatan Pertarungan</Text>
        {battle.battleLog.map((line, i) => <Text key={i} style={styles.logLine}>{line}</Text>)}
      </Card>

      {battle.status === 'victory' && (
        <Card style={styles.resultCard}>
          <Text style={styles.resultTitle}>🏆 Kemenangan!</Text>
          {!battle.rewardsGranted ? <Button title="Terima Hadiah" onPress={game.grantRewards} /> : <Text style={styles.granted}>Hadiah sudah diterima</Text>}
        </Card>
      )}

      {battle.status === 'defeat' && (
        <Card style={[styles.resultCard, styles.defeatCard]}>
          <Text style={[styles.resultTitle, { color: colors.red }]}>💀 Kekalahan</Text>
          <Button title="Kembali" onPress={game.endBattle} variant="danger" />
        </Card>
      )}

      {canAct && (
        <Card style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>Aksi</Text>
          <View style={styles.actionsRow}>
            <Button title="⚔️ Serang" onPress={() => game.playerAction('attack')} />
            <Button title="✨ Skill" onPress={() => game.selectSkill(selectedSkill?.id || 'slash')} variant="secondary" disabled={!canUseSkill} />
            <Button title="🛡️ Bertahan" onPress={() => game.playerAction('defend')} variant="secondary" />
          </View>
          <View style={styles.skillsSection}>
            <Text style={styles.skillsTitle}>Skill</Text>
            {skills.filter(s => game.player.mastery >= s.masteryRequired).map(skill => (
              <Card key={skill.id} style={styles.skillCard} onPress={() => game.selectSkill(skill.id)}>
                <View style={styles.skillInfo}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillDesc}>{skill.description}</Text>
                  <Text style={styles.skillReq}>Mastery {skill.masteryRequired}</Text>
                </View>
                {game.selectedSkillId === skill.id && <View style={styles.skillSelected} />}
              </Card>
            ))}
          </View>
        </Card>
      )}

      {!canAct && <Button title="Kembali ke Jelajahi" onPress={game.endBattle} />}
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
  title: { fontSize: fontSize.xxl, fontWeight: 'bold', color: colors.gold, marginBottom: spacing.md, textAlign: 'center' },
  battleCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: spacing.lg },
  combatant: { alignItems: 'center' },
  name: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.white, marginBottom: spacing.sm },
  enemyName: { color: colors.red },
  hp: { width: 180 },
  vs: { alignItems: 'center' },
  vsText: { fontSize: fontSize.xl, fontWeight: 'bold', color: colors.gray },
  logCard: { backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: borderRadius.md, marginVertical: spacing.md, maxHeight: 150 },
  logTitle: { fontSize: fontSize.sm, fontWeight: 'bold', color: colors.gray, marginBottom: spacing.sm },
  logLine: { fontSize: fontSize.sm, color: colors.lightGray, marginBottom: spacing.xs },
  resultCard: { backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: borderRadius.md, marginVertical: spacing.md, alignItems: 'center' },
  defeatCard: { borderLeftColor: colors.red, borderLeftWidth: 4 },
  resultTitle: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.gold, marginBottom: spacing.sm },
  granted: { color: colors.gray },
  actionsCard: { backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: borderRadius.md },
  actionsTitle: { fontSize: fontSize.md, fontWeight: 'bold', color: colors.white, marginBottom: spacing.sm },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  skillsSection: { marginTop: spacing.sm },
  skillsTitle: { fontSize: fontSize.sm, color: colors.gray, marginBottom: spacing.sm },
  skillCard: { flexDirection: 'row', alignItems: 'center', padding: spacing.sm, marginBottom: spacing.xs, backgroundColor: colors.dark, borderRadius: borderRadius.sm, borderWidth: 1, borderColor: 'transparent' },
  skillInfo: { flex: 1 },
  skillName: { fontSize: fontSize.sm, fontWeight: 'bold', color: colors.white },
  skillDesc: { fontSize: fontSize.xs, color: colors.lightGray },
  skillReq: { fontSize: fontSize.xs, color: colors.gray },
  skillSelected: { width: 4, height: 40, backgroundColor: colors.primary, borderRadius: 2, marginLeft: spacing.sm },
});
