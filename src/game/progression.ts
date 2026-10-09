import { Player, BattleState, BattleRewards, InventoryItem } from './types';
import { rollDrops } from './combat';

export function xpForNextLevel(level: number): number {
  return 100 * level;
}

export function checkLevelUp(player: Player): { player: Player; leveledUp: boolean; levels: number } {
  let levels = 0;
  let current = { ...player };
  while (true) {
    const needed = xpForNextLevel(current.level);
    if (current.xp >= needed) {
      current.xp -= needed;
      current.level += 1;
      current.maxHp += 10;
      current.hp = current.maxHp;
      current.mastery += 10;
      levels += 1;
    } else {
      break;
    }
  }
  return { player: current, leveledUp: levels > 0, levels };
}

export function computeBattleRewards(
  state: BattleState,
  creature: { xpReward: number; masteryReward: number; currencyReward: number; dropTable: DropEntry[] }
): BattleRewards {
  const drops = rollDrops(creature.dropTable);
  const totalCurrency = creature.currencyReward + drops.reduce((sum, d) => sum, 0);
  const xpGained = creature.xpReward;
  const masteryGained = creature.masteryReward;
  return { xpGained, masteryGained, currencyGained: totalCurrency, drops };
}

export function applyBattleRewards(
  player: Player,
  rewards: BattleRewards
): Player {
  let updated = { ...player, xp: player.xp + rewards.xpGained };
  updated = { ...updated, currency: updated.currency + rewards.currencyGained };
  updated = { ...updated, mastery: updated.mastery + rewards.masteryGained };
  const existingMap = new Map(updated.inventory.map(i => [i.itemId, i.quantity]));
  for (const drop of rewards.drops) {
    existingMap.set(drop.itemId, (existingMap.get(drop.itemId) || 0) + drop.quantity);
  }
  updated = {
    ...updated,
    inventory: Array.from(existingMap.entries()).map(([itemId, quantity]) => ({ itemId, quantity })),
  };
  const { player: finalPlayer } = checkLevelUp(updated);
  return finalPlayer;
}
