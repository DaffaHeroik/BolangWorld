import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Player, BattleState, Zone, Creature, Skill, BattleRewards, InventoryItem } from '../game/types';
import { creatures, skills } from '../data';
import { zones } from '../data/zones';
import { items } from '../data/items';
import { computeBattleRewards, applyBattleRewards, xpForNextLevel } from '../game/progression';
import { performAttack, performSkill, performDefend } from '../game/combat';

const initialPlayer: Player = {
  id: 'player',
  name: 'Petani',
  level: 1,
  xp: 0,
  mastery: 0,
  hp: 100,
  maxHp: 100,
  currency: 0,
  inventory: [],
};

export interface GameState {
  player: Player;
  battle: BattleState | null;
  selectedZoneId: string | null;
  selectedCreatureId: string | null;
  selectedSkillId: string | null;
}

interface GameContextType extends GameState {
  startBattle: (creature: Creature) => void;
  playerAction: (action: 'attack' | 'skill' | 'defend') => void;
  endBattle: () => void;
  grantRewards: () => void;
  useItem: (itemId: string, quantity: number) => void;
  selectZone: (zoneId: string) => void;
  selectCreature: (creatureId: string) => void;
  selectSkill: (skillId: string) => void;
  resetProgress: () => void;
  getCreaturesByZone: (zoneId: string) => Creature[];
  getZone: (zoneId: string) => Zone | undefined;
  getItem: (itemId: string) => typeof items[0] | undefined;
  getSkill: (skillId: string) => typeof skills[0] | undefined;
  getPlayerCards: () => { name: string; value: number | string }[];
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    player: initialPlayer,
    battle: null,
    selectedZoneId: null,
    selectedCreatureId: null,
    selectedSkillId: null,
  });

  const set = useCallback((fn: (s: GameState) => GameState) => setState(s => fn(s)), []);

  const startBattle = useCallback((creature: Creature) => {
    set(s => ({
      ...s,
      battle: {
        playerHp: s.player.hp,
        enemyHp: creature.maxHp,
        playerMaxHp: s.player.maxHp,
        enemyMaxHp: creature.maxHp,
        activeCreatureId: creature.id,
        activeCreatureName: creature.name,
        playerName: s.player.name,
        enemyLevel: creature.level,
        status: 'active',
        battleLog: [`Pertarungan dimulai melawan ${creature.name}!`],
        rewardsGranted: false,
      },
    }));
  }, [set]);

  const playerAction = useCallback((action: 'attack' | 'skill' | 'defend') => {
    set(s => {
      if (!s.battle || s.battle.status !== 'active') return s;
      let newPlayerHp = s.battle.playerHp;
      let newEnemyHp = s.battle.enemyHp;
      let log = '';

      if (action === 'attack') {
        const result = performAttack(s.battle, 12);
        newPlayerHp = result.newPlayerHp;
        newEnemyHp = result.newEnemyHp;
        log = result.log;
      } else if (action === 'skill') {
        const skill = skills.find(sk => sk.id === s.selectedSkillId);
        if (!skill) return s;
        const enemyAttack = 12 + (s.battle.enemyLevel - 1) * 3;
        const result = performSkill(s.battle, skill.power, skill.type, s.battle.playerMaxHp, enemyAttack);
        newPlayerHp = result.newPlayerHp;
        newEnemyHp = result.newEnemyHp;
        log = result.log;
      } else if (action === 'defend') {
        const enemyAttack = 12 + (s.battle.enemyLevel - 1) * 3;
        const result = performDefend(s.battle, enemyAttack);
        newPlayerHp = result.newPlayerHp;
        newEnemyHp = result.newEnemyHp;
        log = result.log;
      }

      const status = newEnemyHp <= 0 ? 'victory' : newPlayerHp <= 0 ? 'defeat' : 'active';
      const newLog = [...s.battle.battleLog, log];

      return {
        ...s,
        player: { ...s.player, hp: newPlayerHp, maxHp: s.battle.playerMaxHp },
        battle: { ...s.battle, playerHp: newPlayerHp, enemyHp: newEnemyHp, status, battleLog: newLog },
      };
    });
  }, [set, skills]);

  const grantRewards = useCallback(() => {
    set(s => {
      if (!s.battle || s.battle.status !== 'victory' || s.battle.rewardsGranted) return s;
      const creature = creatures.find(c => c.id === s.battle!.activeCreatureId);
      if (!creature) return s;
      const rewards = computeBattleRewards(s.battle, creature);
      const newPlayer = applyBattleRewards(s.player, rewards);
      return {
        ...s,
        player: newPlayer,
        battle: { ...s.battle, rewardsGranted: true, battleLog: [...s.battle.battleLog, `Victory! +${rewards.xpGained} XP, +${rewards.masteryGained} mastery, +${rewards.currencyGained} currency, drops: ${rewards.drops.map(d => `${d.quantity}x ${d.itemId}`).join(', ')}`] },
      };
    });
  }, [set]);

  const useItem = useCallback((itemId: string, quantity: number) => {
    set(s => {
      const existing = s.player.inventory.find(i => i.itemId === itemId);
      if (!existing || existing.quantity < quantity) return s;
      const remaining = existing.quantity - quantity;
      let newInventory: InventoryItem[];
      if (remaining <= 0) {
        newInventory = s.player.inventory.filter(i => i.itemId !== itemId);
      } else {
        newInventory = s.player.inventory.map(i => i.itemId === itemId ? { ...i, quantity: remaining } : i);
      }
      return { ...s, player: { ...s.player, inventory: newInventory } };
    });
  }, [set]);

  const selectZone = useCallback((zoneId: string) => set(s => ({ ...s, selectedZoneId: zoneId, selectedCreatureId: null })), [set]);
  const selectCreature = useCallback((creatureId: string) => set(s => ({ ...s, selectedCreatureId: creatureId })), [set]);
  const selectSkill = useCallback((skillId: string) => set(s => ({ ...s, selectedSkillId: skillId })), [set]);

  const endBattle = useCallback(() => set(s => ({ ...s, battle: null })), [set]);

  const resetProgress = useCallback(() => set(() => ({ player: initialPlayer, battle: null, selectedZoneId: null, selectedCreatureId: null, selectedSkillId: null })), [set]);

  const getCreaturesByZone = useCallback((zoneId: string) => {
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return [];
    return zone.creatureIds.map(id => creatures.find(c => c.id === id)).filter(Boolean) as Creature[];
  }, []);

  const getZone = useCallback((zoneId: string) => zones.find(z => z.id === zoneId), []);

  const getItem = useCallback((itemId: string) => items.find(i => i.id === itemId), []);

  const getSkill = useCallback((skillId: string) => skills.find(s => s.id === skillId), []);

  const getPlayerCards = useCallback(() => [
    { name: 'Level', value: state.player.level },
    { name: 'XP', value: `${state.player.xp} / ${xpForNextLevel(state.player.level)}` },
    { name: 'Mastery', value: state.player.mastery },
    { name: 'HP', value: `${state.player.hp} / ${state.player.maxHp}` },
    { name: 'Currency', value: state.player.currency },
  ], [state.player]);

  return (
    <GameContext.Provider value={{
      ...state,
      startBattle,
      playerAction,
      grantRewards,
      useItem,
      selectZone,
      selectCreature,
      selectSkill,
      endBattle,
      resetProgress,
      getCreaturesByZone,
      getZone,
      getItem,
      getSkill,
      getPlayerCards,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
