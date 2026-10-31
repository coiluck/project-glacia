import { battleStageRegistry } from '../../../src/data/battleStages';
import { characterMasters } from '../../../src/data/characters';
import { enemyDefs } from '../../../src/data/enemies';
import { chapters, type Chapter, type Stage } from '../../../src/data/stages';
import { unitClasses } from '../../../src/data/unitClasses';
import { createBattleState, deployAlly, endTurn, startBattle } from '../../../src/features/battle/battle';
import { actEnemy } from '../../../src/features/battle/ai';
import { axialKey, neighbors } from '../../../src/features/battle/hex';
import { isPassable } from '../../../src/features/battle/terrain';
import type { BattleStageData, BattleState, EnemySpawn } from '../../../src/features/battle/types';
import { toCharacterDef } from '../../../src/features/characters/build';
import { resolveCharacter } from '../../../src/features/characters/resolve';

export function chapterOf(chapterId: number): Chapter {
  const chapter = chapters.find((c) => c.id === chapterId);
  if (!chapter) throw new Error(`章が無い: ${chapterId}`);
  return chapter;
}

export function stagesOf(chapterId: number): Stage[] {
  return chapterOf(chapterId).stages;
}

export function battleStageOf(stageId: string): BattleStageData {
  const stage = battleStageRegistry[stageId];
  if (!stage) throw new Error(`戦闘マップが無い: ${stageId}`);
  return stage;
}

// 盤面の段数と、文字の絵での列の幅（grid.ts の書き方で、1段の中のタイルは2列おき）
export function boardSize(stage: BattleStageData): { rows: number; colSpan: number } {
  const rows = stage.tiles.map((t) => t.pos.r);
  const cols = stage.tiles.map((t) => 2 * t.pos.q + t.pos.r);
  return {
    rows: Math.max(...rows) - Math.min(...rows) + 1,
    colSpan: Math.max(...cols) - Math.min(...cols),
  };
}

export function passableKeys(stage: BattleStageData): Set<string> {
  return new Set(stage.tiles.filter(isPassable).map((t) => axialKey(t.pos)));
}

// 配置マスから歩いて届くマス。ユニットは障害物として数えない
export function reachableFromDeploy(stage: BattleStageData): Set<string> {
  const passable = passableKeys(stage);
  const seen = new Set(stage.deployableTiles.map(axialKey));
  const queue = [...stage.deployableTiles];
  while (queue.length) {
    for (const n of neighbors(queue.shift()!)) {
      const key = axialKey(n);
      if (seen.has(key) || !passable.has(key)) continue;
      seen.add(key);
      queue.push(n);
    }
  }
  return seen;
}

const allyHp = (state: BattleState) =>
  state.units.filter((u) => u.side === 'ally').reduce((sum, u) => sum + u.hp, 0);

// 敵を1体だけ盤面に置き、動かない味方に maxTurns ターン以内に攻撃が届くか
// 敵の AI は直線距離で寄るだけなので、通れないマスの塊の裏に置くとその手前で止まる。それを見つけるためのもの
// 味方は倒されないように HP を大きくして、配置マスの先頭から並べる
export function soloEnemyReachesAllies(stage: BattleStageData, spawn: EnemySpawn, maxTurns = 10): boolean {
  const solo: BattleStageData = { ...stage, enemies: [spawn] };
  let state = createBattleState(solo, enemyDefs);
  const masters = Object.values(characterMasters).slice(0, Math.min(5, stage.deployableTiles.length));
  masters.forEach((master, i) => {
    const resolved = resolveCharacter(master, {
      masterId: master.id,
      level: 1,
      exp: 0,
      limitBreak: 0,
      dupe: 0,
      selectedSkillId: master.skills[0].def.id,
      skillLevels: {},
    });
    state = deployAlly(state, solo, toCharacterDef(resolved), resolved.selectedSkill.def, stage.deployableTiles[i]);
  });
  state = {
    ...state,
    units: state.units.map((u) => (u.side === 'ally' ? { ...u, hp: 1e6, maxHp: 1e6 } : u)),
  };
  state = startBattle(state, solo, unitClasses);

  for (let turn = 0; turn < maxTurns; turn++) {
    state = endTurn(state, solo, unitClasses);
    const before = allyHp(state);
    const enemy = state.units.find((u) => u.side === 'enemy')!;
    state = actEnemy(state, solo, unitClasses, enemy.id);
    if (allyHp(state) < before) return true;
    state = endTurn(state, solo, unitClasses);
  }
  return false;
}
