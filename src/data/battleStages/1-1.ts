import { axialKey, coordsInRange } from '../../features/battle/hex';
import type { TerrainKind } from '../../features/battle/terrain';
import type { BattleStageData, StageTile } from '../../features/battle/types';

// 1-1（チュートリアル）のマップ。半径3の六角形・37タイル
// data/battleGuides/1-1.ts の台本がマスの座標と敵の並びに依存しているので、変えるときは台本も合わせる
// 既定の地形は左半分が草原・右半分が土。ここに載せた座標だけ上書きする
const TERRAIN: Record<string, TerrainKind> = {
  // 盤面を左右に分ける川（通行不可）。(0,-1)(0,0)(0,1) だけ渡れる
  '0,-3': 'water',
  '0,-2': 'water',
  '0,2': 'water',
  '0,3': 'water',
  // 左奥の雪原
  '-1,-2': 'snow',
  '-2,-1': 'snow',
  // 左手前の砂地
  '-3,2': 'sand',
  '-3,3': 'sand',
  '-2,3': 'sand',
  // 右側の岩場
  '2,1': 'stone',
  '3,-2': 'stone',
};

const tiles: StageTile[] = coordsInRange({ q: 0, r: 0 }, 3).map((pos) => ({
  pos,
  terrain: TERRAIN[axialKey(pos)] ?? (pos.q < 0 ? 'grass' : 'dirt'),
}));

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
  // 右側に弱い氷晶兵2体
  enemies: [
    { enemyId: 'iceGruntWeak', pos: { q: 2, r: -1 } },
    { enemyId: 'iceGruntWeak', pos: { q: 3, r: 0 } },
  ],
};

export default stage;
