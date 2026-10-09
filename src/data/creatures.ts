import { Creature } from '../game/types';

export const creatures: Creature[] = [
  { id: 'slime', name: 'Slime', level: 1, maxHp: 30, attack: 6, xpReward: 15, masteryReward: 5, currencyReward: 10, dropTable: [{ itemId: 'potion', chance: 0.7, minQuantity: 1, maxQuantity: 2 }, { itemId: 'silver_coin', chance: 0.6, minQuantity: 2, maxQuantity: 5 }] },
  { id: 'wild_boar', name: 'Wild Boar', level: 2, maxHp: 40, attack: 8, xpReward: 25, masteryReward: 8, currencyReward: 15, dropTable: [{ itemId: 'potion', chance: 0.5, minQuantity: 1, maxQuantity: 1 }, { itemId: 'silver_coin', chance: 0.7, minQuantity: 3, maxQuantity: 8 }] },
  { id: 'skeleton', name: 'Skeleton', level: 3, maxHp: 50, attack: 10, xpReward: 35, masteryReward: 10, currencyReward: 20, dropTable: [{ itemId: 'great_potion', chance: 0.3, minQuantity: 1, maxQuantity: 1 }, { itemId: 'gold_coin', chance: 0.4, minQuantity: 1, maxQuantity: 3 }] },
  { id: 'dark_ranger', name: 'Dark Ranger', level: 4, maxHp: 55, attack: 12, xpReward: 45, masteryReward: 12, currencyReward: 25, dropTable: [{ itemId: 'great_potion', chance: 0.5, minQuantity: 1, maxQuantity: 2 }, { itemId: 'gold_coin', chance: 0.6, minQuantity: 2, maxQuantity: 5 }] },
  { id: 'stone_golem', name: 'Stone Golem', level: 5, maxHp: 70, attack: 14, xpReward: 60, masteryReward: 15, currencyReward: 30, dropTable: [{ itemId: 'great_potion', chance: 0.4, minQuantity: 1, maxQuantity: 1 }, { itemId: 'gold_coin', chance: 0.7, minQuantity: 3, maxQuantity: 7 }, { itemId: 'potion', chance: 0.5, minQuantity: 2, maxQuantity: 4 }] },
];
