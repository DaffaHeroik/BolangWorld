export interface Player {
  id: string;
  name: string;
  level: number;
  xp: number;
  mastery: number;
  hp: number;
  maxHp: number;
  currency: number;
  inventory: InventoryItem[];
}

export interface InventoryItem {
  itemId: string;
  quantity: number;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  recommendedLevel: number;
  creatureIds: string[];
}

export interface Creature {
  id: string;
  name: string;
  level: number;
  maxHp: number;
  attack: number;
  xpReward: number;
  masteryReward: number;
  currencyReward: number;
  dropTable: DropEntry[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  masteryRequired: number;
  power: number;
  resourceCost: number;
  type: 'attack' | 'heal' | 'defense';
}

export interface Item {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'legendary';
  description: string;
  icon: string;
}

export interface DropEntry {
  itemId: string;
  chance: number;
  minQuantity: number;
  maxQuantity: number;
}

export type BattleStatus = 'active' | 'victory' | 'defeat';

export interface BattleState {
  playerHp: number;
  enemyHp: number;
  playerMaxHp: number;
  enemyMaxHp: number;
  activeCreatureId: string;
  activeCreatureName: string;
  playerName: string;
  enemyLevel: number;
  status: BattleStatus;
  battleLog: string[];
  rewardsGranted: boolean;
}

export interface BattleRewards {
  xpGained: number;
  masteryGained: number;
  currencyGained: number;
  drops: InventoryItem[];
}

