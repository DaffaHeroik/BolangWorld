import { BattleState, DropEntry, InventoryItem } from './types';

export function applyDamage(amount: number, targetHp: number, maxHp: number): number {
  if (amount < 0) return targetHp;
  return Math.max(0, Math.min(maxHp, targetHp - amount));
}

export function applyHealing(amount: number, currentHp: number, maxHp: number): number {
  if (amount < 0) return currentHp;
  return Math.min(maxHp, currentHp + amount);
}

export function playerDamageRoll(playerBaseAttack: number): number {
  const lower = Math.max(0, playerBaseAttack - 4);
  const upper = playerBaseAttack + 4;
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}

export function enemyDamageRoll(enemyAttack: number): number {
  const lower = Math.max(0, Math.floor(enemyAttack * 0.7));
  const upper = Math.ceil(enemyAttack * 1.3);
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}

export function performAttack(
  state: BattleState,
  playerBaseAttack: number
): { newPlayerHp: number; newEnemyHp: number; log: string } {
  const damage = playerDamageRoll(playerBaseAttack);
  const newEnemyHp = applyDamage(damage, state.enemyHp, state.enemyMaxHp);
  const log = `⚔️ ${state.playerName} menyerang ${state.activeCreatureName} (damage: ${damage})`;
  let nextPlayerHp = state.playerHp;
  if (newEnemyHp <= 0) {
    return { newPlayerHp: state.playerHp, newEnemyHp, log };
  }
  const incomingDamage = enemyDamageRoll(state.enemyMaxHp); // placeholder, will be overridden below
  const enemyActualDamage = enemyDamageRoll(
    12 + (state.enemyLevel - 1) * 3
  );
  nextPlayerHp = applyDamage(enemyActualDamage, state.playerHp, state.playerMaxHp);
  return {
    newPlayerHp,
    newEnemyHp,
    log: `${log}\n💥 ${state.activeCreatureName} menyerang balik (${enemyActualDamage} damage)`,
  };
}

export function performSkill(
  state: BattleState,
  skillPower: number,
  skillType: 'attack' | 'heal' | 'defense',
  playerMaxHp: number,
  enemyAttack: number
): { newPlayerHp: number; newEnemyHp: number; log: string } {
  let log = '';
  let newPlayerHp = state.playerHp;
  let newEnemyHp = state.enemyHp;

  if (skillType === 'attack') {
    const damage = skillPower + Math.floor(Math.random() * 6);
    newEnemyHp = applyDamage(damage, state.enemyHp, state.enemyMaxHp);
    log = `✨ Skill menyerang (${damage} damage)`;
  } else if (skillType === 'heal') {
    newPlayerHp = applyHealing(skillPower, state.playerHp, playerMaxHp);
    log = `💚 Menyembuhkan (${skillPower} HP)`;
  } else if (skillType === 'defense') {
    const reduction = Math.floor(skillPower * 0.4);
    const incoming = enemyDamageRoll(enemyAttack);
    const reducedIncoming = Math.max(0, incoming - reduction);
    newPlayerHp = applyDamage(reducedIncoming, state.playerHp, playerMaxHp);
    log = `🛡️ Bertahan (reduced ${reducedIncoming} from ${incoming} damage)`;
  }

  if (newEnemyHp > 0 && skillType !== 'heal') {
    const enemyActualDamage = enemyDamageRoll(enemyAttack);
    newPlayerHp = applyDamage(enemyActualDamage, newPlayerHp, playerMaxHp);
    log += `\n💥 ${state.activeCreatureName} menyerang (${enemyActualDamage} damage)`;
  }

  return { newPlayerHp, newEnemyHp, log };
}

export function performDefend(
  state: BattleState,
  enemyAttack: number
): { newPlayerHp: number; newEnemyHp: number; log: string } {
  const reduction = Math.floor(enemyAttack * 0.5);
  const incoming = enemyDamageRoll(enemyAttack);
  const reducedIncoming = Math.max(0, incoming - reduction);
  const newPlayerHp = applyDamage(reducedIncoming, state.playerHp, state.playerMaxHp);
  const log = `🛡️ Bertahan (${reducedIncoming} damage daripada ${incoming})`;
  return { newPlayerHp, newEnemyHp: state.enemyHp, log };
}

export function rollDrops(dropTable: DropEntry[]): InventoryItem[] {
  const drops: InventoryItem[] = [];
  for (const entry of dropTable) {
    if (Math.random() < entry.chance) {
      const quantity = entry.minQuantity + Math.floor(Math.random() * (entry.maxQuantity - entry.minQuantity + 1));
      drops.push({ itemId: entry.itemId, quantity });
    }
  }
  return drops;
}
