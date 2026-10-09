import { Skill } from '../game/types';

export const skills: Skill[] = [
  { id: 'slash', name: 'Treasure Slash', description: 'Serangan cepat dengan pedang.', masteryRequired: 0, power: 15, resourceCost: 0, type: 'attack' },
  { id: 'charged_shot', name: 'Charged Shot', description: 'Ambil napas dan tembak pembunuh.', masteryRequired: 10, power: 25, resourceCost: 0, type: 'attack' },
  { id: 'healing', name: 'Healing Light', description: 'Sembuhkan diri dengan cahaya suci.', masteryRequired: 5, power: 20, resourceCost: 0, type: 'heal' },
  { id: 'barrier', name: 'Barrier', description: 'Kembang pertahanan selama 1 giliran.', masteryRequired: 8, power: 30, resourceCost: 0, type: 'defense' },
];
