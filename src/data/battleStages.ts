// 戦闘マップの定義。キーは stages.ts の Stage.id と一致させる（scenarioRegistry と同じ流儀）。
import { coordsInRange } from '../features/battle/hex';
import type { BattleStageData } from '../features/battle/types';

export const battleStageRegistry: Record<string, BattleStageData> = {
  '1-1': {
    // 半径3の六角形マップ（37タイル）
    tiles: coordsInRange({ q: 0, r: 0 }, 3),
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
  },
};
