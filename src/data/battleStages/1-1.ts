import { axialKey, coordsInRange } from '../../features/battle/hex';
import type { TerrainKind } from '../../features/battle/terrain';
import type { BattleStageData, StageTile } from '../../features/battle/types';

// 1-1（チュートリアル）のマップ。半径3の六角形・37タイル
// data/battleGuides/1-1.ts の台本がマスの座標と敵の並びに依存しているので、変えるときは台本も合わせる
const TERRAIN: Record<string, TerrainKind> = {
  // 盤面を左右に分ける川（通行不可）。(0,-1)(0,0)(0,1) だけ渡れる
  '0,-3': 'water',
  '0,-2': 'water',
  '0,2': 'water',
  '0,3': 'water',
  // 浅瀬の飛び石
  '0,-1': 'stone',
  '0,0': 'stone',
  '0,1': 'stone',
  // 川を越えて左岸に吹き込んだ雪
  '-1,-2': 'snow',
  '-1,-1': 'snow',
  // 右岸に残った草地
  '1,1': 'grass',
  '1,2': 'grass',
};

const tiles: StageTile[] = coordsInRange({ q: 0, r: 0 }, 3).map((pos) => ({
  pos,
  terrain: TERRAIN[axialKey(pos)] ?? (pos.q < 0 ? 'grass' : 'snow'),
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
  enemies: [
    { enemyId: 'glacimo', pos: { q: 2, r: -1 } },
    { enemyId: 'glacimo', pos: { q: 3, r: 0 } },
  ],
};

export default stage;
