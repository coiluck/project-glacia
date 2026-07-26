import { axialKey, coordsInRange } from '../../features/battle/hex';
import type { TerrainKind } from '../../features/battle/terrain';
import type { BattleStageData, StageTile } from '../../features/battle/types';

// テスト用マップ（半径3の六角形・37タイル）
// 既定の地形は左半分が草原・右半分が土。ここに載せた座標だけ上書きする
const TERRAIN: Record<string, TerrainKind> = {
  // 盤面を左右に分ける川（通行不可）。(0,0) だけ橋として残す
  '0,-3': 'water',
  '0,-2': 'water',
  '0,-1': 'water',
  '0,1': 'water',
  '0,2': 'water',
  '0,3': 'water',
  // 右奥の溶岩地帯（通行不可）
  '2,-3': 'lava',
  '3,-3': 'lava',
  // 右奥に空いた奈落（通行不可）
  '1,-3': 'void',
  // 左奥の雪原
  '-1,-2': 'snow',
  '-1,-1': 'snow',
  '-2,-1': 'snow',
  // 左手前の砂地
  '-3,2': 'sand',
  '-3,3': 'sand',
  '-2,2': 'sand',
  '-2,3': 'sand',
  // 右側の岩場（台地に使う）
  '2,0': 'stone',
  '1,2': 'stone',
};

// 台地の高さ。0以外は通行不可になる
const ELEVATION: Record<string, number> = {
  '-1,-1': 1, // 周囲と同じ雪原のまま盛り上がった台地
  '2,0': 1,
  '1,2': 2,
};

const tiles: StageTile[] = coordsInRange({ q: 0, r: 0 }, 3).map((pos) => {
  const key = axialKey(pos);
  return {
    pos,
    terrain: TERRAIN[key] ?? (pos.q < 0 ? 'grass' : 'dirt'),
    elevation: ELEVATION[key],
  };
});

const stage: BattleStageData = {
  tiles,
  // 左端寄りの5マスに味方を配置できる
  deployableTiles: [
    { q: -3, r: 0 },
    { q: -3, r: 1 },
    { q: -2, r: -1 },
    { q: -2, r: 0 },
    { q: -2, r: 1 },
  ],
  partyApPerTurn: 10,
  // 右側に雑魚3体 + 範囲攻撃持ちのボス1体
  enemies: [
    { enemyId: 'iceGrunt', pos: { q: 2, r: -1 } },
    { enemyId: 'iceGrunt', pos: { q: 2, r: 1 } },
    { enemyId: 'iceArcher', pos: { q: 3, r: 0 } },
    { enemyId: 'frostRaider', pos: { q: 3, r: -2 } },
  ],
};

export default stage;
