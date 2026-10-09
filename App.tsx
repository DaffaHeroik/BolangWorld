import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { GameProvider, useGame } from './src/state/GameContext';
import { HomeScreen, ExploreScreen, BattleScreen, InventoryScreen, SkillsScreen, FriendsScreen, SettingsScreen } from './src/screens';
import { colors, spacing, fontSize } from './src/theme';

type Tab = 'home' | 'explore' | 'battle' | 'inventory' | 'skills' | 'friends' | 'settings';

function TabBar({ active }: { active: Tab }) {
  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'home', label: 'Beranda', icon: '🏠' },
    { key: 'explore', label: 'Jelajahi', icon: '🌍' },
    { key: 'battle', label: 'Perang', icon: '⚔️' },
    { key: 'inventory', label: 'Inventaris', icon: '🎒' },
    { key: 'skills', label: 'Keahlian', icon: '✨' },
    { key: 'friends', label: 'Teman', icon: '👥' },
    { key: 'settings', label: 'Pengaturan', icon: '⚙️' },
  ];
  return (
    <View style={styles.tabBar}>
      {tabs.map(tab => (
        <Text
          key={tab.key}
          style={[styles.tab, active === tab.key && styles.tabActive, active === tab.key && styles.tabIcon]}
          onPress={() => {}}
        >
          {tab.icon} {tab.label}
        </Text>
      ))}
    </View>
  );
}

function AppContent() {
  const game = useGame();
  const [tab, setTab] = React.useState<Tab>('home');

  const renderScreen = () => {
    switch (tab) {
      case 'home': return <HomeScreen />;
      case 'explore': return <ExploreScreen />;
      case 'battle': return <BattleScreen />;
      case 'inventory': return <InventoryScreen />;
      case 'skills': return <SkillsScreen />;
      case 'friends': return <FriendsScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LOKAVERSE</Text>
        <Text style={styles.headerSub}>Level {game.player.level} · {game.player.name}</Text>
      </View>
      <View style={styles.screen}>{renderScreen()}</View>
      <TabBar active={tab} />
    </View>
  );
}

export default function App() {
  return (
    <GameProvider>
      <StatusBar style="light" />
      <AppContent />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { padding: spacing.md, backgroundColor: colors.cardBg, borderBottomWidth: 1, borderBottomColor: colors.dark },
  headerTitle: { fontSize: fontSize.lg, fontWeight: 'bold', color: colors.gold },
  headerSub: { fontSize: fontSize.sm, color: colors.gray },
  screen: { flex: 1 },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.cardBg, paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.dark },
  tab: { fontSize: fontSize.xs, color: colors.gray, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  tabActive: { color: colors.gold, fontWeight: 'bold' },
  tabIcon: { flex: 1, textAlign: 'center' },
});
