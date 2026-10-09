import { DropEntry, Item } from './types';

export const startingItems: Item[] = [
  { id: 'potion', name: 'Potion', rarity: 'common', description: 'Mendeteksi 20 HP', icon: '🧪' },
];

export function startingDropTables(): Record<string, DropEntry[]> {
  return {
    potion: [
      { itemId: 'potion', chance: 0.7, minQuantity: 1, maxQuantity: 2 },
    ],
  };
}
