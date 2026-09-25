import type { Axial } from '../../features/battle/hex';
import type { TerrainKind } from '../../features/battle/terrain';
import type { BattleStageData, EnemySpawn, StageTile } from '../../features/battle/types';

// 文字の絵で書いたマップを BattleStageData にする
// 1文字が1タイル。1行が r の1段で、同じ段のタイルは1文字あけて並べ、段ごとに1文字ずつずらす（六角形の並びがそのまま見える）
// 座標は r = 行番号、q = (列 - 行) / 2。偶数行は偶数列、奇数行は奇数列にしか書けない

// 地形の文字。大文字は同じ地形の台地（elevation 1・通行不可）
const TERRAIN_CHARS: Record<string, TerrainKind> = {
  g: 'grass',
  d: 'dirt',
  s: 'sand',
  t: 'stone',
  n: 'snow',
  w: 'water',
  l: 'lava',
  v: 'void',
};

export interface StageMap {
  terrain: string[];
  // terrain と同じ形で書く。'.' は何も置かないマス、'@' は味方の初期配置マス、それ以外は enemies の文字
  units: string[];
  enemies: Record<string, string>; // 文字 -> EnemyDef.id
  partyApPerTurn: number;
}

function cells(rows: string[]): { pos: Axial; ch: string }[] {
  return rows.flatMap((row, r) =>
    [...row].flatMap((ch, col) => {
      if (ch === ' ') return [];
      if ((col - r) % 2 !== 0) throw new Error(`マップの文字がずれている: ${r}行目 ${col}列目 '${ch}'`);
      return [{ pos: { q: (col - r) / 2, r }, ch }];
    }),
  );
}

export function stageFromMap(map: StageMap): BattleStageData {
  const tiles: StageTile[] = cells(map.terrain).map(({ pos, ch }) => {
    const terrain = TERRAIN_CHARS[ch.toLowerCase()];
    if (!terrain) throw new Error(`地形の文字が無い: '${ch}'`);
    return ch === ch.toUpperCase() ? { pos, terrain, elevation: 1 } : { pos, terrain };
  });

  const deployableTiles: Axial[] = [];
  const enemies: EnemySpawn[] = [];
  for (const { pos, ch } of cells(map.units)) {
    if (ch === '.') continue;
    if (ch === '@') {
      deployableTiles.push(pos);
      continue;
    }
    const enemyId = map.enemies[ch];
    if (!enemyId) throw new Error(`敵の文字が無い: '${ch}'`);
    enemies.push({ enemyId, pos });
  }

  return { tiles, deployableTiles, partyApPerTurn: map.partyApPerTurn, enemies };
}
