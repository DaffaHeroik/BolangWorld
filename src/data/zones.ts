import { Zone } from '../game/types';

export const zones: Zone[] = [
  { id: 'meadow', name: 'Teras Meadow', description: 'Padang rumput lembut dengan bunga liar.', recommendedLevel: 1, creatureIds: ['slime', 'wild_boar'] },
  { id: 'crypt', name: 'Old Crypt', description: 'Benteng tua penuh dengan peri dan hantu.', recommendedLevel: 2, creatureIds: ['skeleton'] },
  { id: 'dark_forest', name: 'Hutan Gelap', description: 'Hutan hitam pekat dengan rintangan dan bahaya tersembunyi.', recommendedLevel: 3, creatureIds: ['dark_ranger'] },
  { id: 'golem_cave', name: 'Golem Cave', description: 'Goa batu raksasa yang menyimpan kejutan dan bahaya.', recommendedLevel: 4, creatureIds: ['stone_golem'] },
];
