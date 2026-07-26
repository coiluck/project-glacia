import type { StageTile } from './types';

// 地形の種類。data/ 側のステージ定義から参照する
export type TerrainKind =
  | 'grass'
  | 'dirt'
  | 'sand'
  | 'stone'
  | 'snow'
  | 'water'
  | 'lava'
  | 'void';

// 地形そのものの定義。見た目は pages/battle/terrainStyles.ts が持つ
export interface TerrainDef {
  nameKey: string; // i18n キー
  passable: boolean; // 通行できるか（配置可否は deployableTiles で別途指定）
}

export const TERRAINS: Record<TerrainKind, TerrainDef> = {
  grass:  { nameKey: 'terrain.grass',  passable: true  },
  dirt:   { nameKey: 'terrain.dirt',   passable: true  },
  sand:   { nameKey: 'terrain.sand',   passable: true  },
  stone:  { nameKey: 'terrain.stone',  passable: true  },
  snow:   { nameKey: 'terrain.snow',   passable: true  },
  water:  { nameKey: 'terrain.water',  passable: false },
  lava:   { nameKey: 'terrain.lava',   passable: false },
  void:   { nameKey: 'terrain.void',   passable: false },
};

// 通行可能か
export function isPassable(tile: StageTile): boolean {
  if ((tile.elevation ?? 0) > 0) return false;
  return TERRAINS[tile.terrain].passable;
}
