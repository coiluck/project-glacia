// 戦闘の初期化・アクション実行（移動/通常攻撃/スキル）・ターン進行・勝敗判定
import { axialKey, distance, reachable, shapeTiles } from './hex';
import type { Axial } from './hex';
import { canSpendAp, refillApForTurn, spendAp } from './ap';
import { calcDamage } from './damage';
import type {
  BattleStageData,
  BattleState,
  CharacterDef,
  EnemyDef,
  SkillDef,
  Unit,
  UnitClassDef,
} from './types';

// 指定座標に居るユニット
export function unitAt(state: BattleState, pos: Axial): Unit | undefined {
  return state.units.find((u) => u.pos.q === pos.q && u.pos.r === pos.r);
}

// そのユニットがこの手番に使える残りAP（味方は個人APとパーティAPの少ない方）
export function availableAp(state: BattleState, unit: Unit): number {
  return unit.side === 'ally' ? Math.min(unit.ap, state.partyAp) : unit.ap;
}

// 初期化
// ステージデータから配置フェーズの状態を作る。この時点では敵だけ盤面に居る
export function createBattleState(
  stage: BattleStageData,
  enemyDefs: Record<string, EnemyDef>, // data/ 側で定義された敵の定義。keyはenemyId
): BattleState {
  const units = stage.enemies.map((spawn, i): Unit => {
    const def = enemyDefs[spawn.enemyId];
    if (!def) throw new Error(`Unknown enemy: ${spawn.enemyId}`);
    return {
      id: `enemy-${i}-${def.id}`,
      side: 'enemy',
      classId: def.classId,
      pos: spawn.pos,
      hp: def.hp,
      maxHp: def.maxHp,
      attack: def.attack,
      defense: def.defense,
      ap: 0,
      skill: def.skill?.def,
      skillEveryNTurns: def.skill?.everyNTurns,
      skillHpTriggers: def.skill?.hpTriggers ? [...def.skill.hpTriggers] : undefined,
    };
  });
  return { phase: 'deployment', turn: 0, partyAp: 0, units };
}

// 味方1人を配置
export function deployAlly(
  state: BattleState,
  stage: BattleStageData,
  character: CharacterDef,
  skill: SkillDef | undefined,
  pos: Axial,
): void {
  if (state.phase !== 'deployment') throw new Error(`Not in deployment phase: ${state.phase}`);
  const deployable = stage.deployableTiles.some((t) => t.q === pos.q && t.r === pos.r);
  if (!deployable || unitAt(state, pos)) {
    throw new Error(`Cannot deploy at (${pos.q},${pos.r})`);
  }
  state.units.push({
    id: `ally-${character.id}`,
    side: 'ally',
    classId: character.classId,
    pos,
    hp: character.hp,
    maxHp: character.maxHp,
    attack: character.attack,
    defense: character.defense,
    ap: 0,
    skill: skill,
  });
}

// 配置を確定して戦闘を開始
export function startBattle(
  state: BattleState,
  stage: BattleStageData,
  classes: Record<string, UnitClassDef>,
): void {
  if (state.phase !== 'deployment') throw new Error(`Not in deployment phase: ${state.phase}`);
  if (!state.units.some((u) => u.side === 'ally')) throw new Error('No allies deployed');
  state.phase = 'player';
  state.turn = 1;
  refillApForTurn(state, 'ally', classes, stage.partyApPerTurn);
}

// 移動
// 必要APと移動できるマス
export function movementRange(
  state: BattleState,
  stage: BattleStageData,
  unit: Unit,
): { pos: Axial; cost: number }[] {
  const tiles = new Set(stage.tiles.map(axialKey));
  const occupied = new Set(state.units.map((u) => axialKey(u.pos)));
  return reachable(unit.pos, availableAp(state, unit), (c) => {
    const key = axialKey(c);
    return tiles.has(key) && !occupied.has(key);
  });
}

// 移動して歩数分のAPを消費
export function moveUnit(
  state: BattleState,
  stage: BattleStageData,
  unit: Unit,
  dest: Axial,
): void {
  const entry = movementRange(state, stage, unit).find(
    (t) => t.pos.q === dest.q && t.pos.r === dest.r,
  );
  if (!entry) throw new Error(`Cannot move to (${dest.q},${dest.r})`);
  spendAp(state, unit, entry.cost);
  unit.pos = dest;
}

// 通常攻撃
// targetsは攻撃範囲内からUI側で選んだ相手。pattern型の範囲は direction（0〜5）で回転
export function attack(
  state: BattleState,
  classes: Record<string, UnitClassDef>,
  attacker: Unit,
  targets: Unit[],
  direction = 0,
): void {
  const cls = classes[attacker.classId];
  if (!cls) throw new Error(`Unknown unit class: ${attacker.classId}`);
  if (!canSpendAp(state, attacker, cls.attackCost)) throw new Error('Not enough AP');
  if (typeof cls.attackTargets === 'number' && targets.length > cls.attackTargets) {
    throw new Error(`Too many targets: ${targets.length} > ${cls.attackTargets}`);
  }
  const area = new Set(shapeTiles(attacker.pos, cls.attackRange, direction).map(axialKey));
  for (const target of targets) {
    if (target.side === attacker.side || !area.has(axialKey(target.pos))) {
      throw new Error(`Invalid target: ${target.id}`);
    }
  }
  spendAp(state, attacker, cls.attackCost);
  for (const target of targets) {
    target.hp = Math.max(0, target.hp - calcDamage(attacker, target, cls.attackPower));
  }
  removeDead(state);
}

// スキル
// targetsは射程内からUI側で選んだ対象。range 0なら自分が対象
export function castSkill(state: BattleState, user: Unit, targets: Unit[]): void {
  const skill = user.skill;
  if (!skill) throw new Error(`Unit has no skill: ${user.id}`);
  if (!canSpendAp(state, user, skill.apCost)) throw new Error('Not enough AP');
  for (const target of targets) {
    if (distance(user.pos, target.pos) > skill.range) {
      throw new Error(`Out of range: ${target.id}`);
    }
  }
  spendAp(state, user, skill.apCost);
  for (const effect of skill.effect) {
    switch (effect.type) {
      case 'damage': {
        // effect.target に合致する対象にだけダメージを与える
        const hit = targets.filter((t) =>
          effect.target === 'self'
            ? t === user
            : (t.side === user.side) === (effect.target === 'ally'),
        );
        for (const t of hit) {
          t.hp = Math.max(0, t.hp - calcDamage(user, t, effect.power));
        }
        break;
      }
      case 'healHp':
        for (const t of targets) t.hp = Math.min(t.maxHp, t.hp + effect.amount);
        break;
      case 'grantAp':
        for (const t of targets) t.ap += effect.amount;
        break;
    }
  }
  removeDead(state);
}

// ターン進行
export function endTurn(
  state: BattleState,
  stage: BattleStageData,
  classes: Record<string, UnitClassDef>,
): void {
  if (state.phase === 'player') {
    state.phase = 'enemy';
    refillApForTurn(state, 'enemy', classes, stage.partyApPerTurn);
  } else if (state.phase === 'enemy') {
    state.phase = 'player';
    state.turn += 1;
    refillApForTurn(state, 'ally', classes, stage.partyApPerTurn);
  } else {
    throw new Error(`Cannot end turn in phase: ${state.phase}`);
  }
}

// HP0のユニットを取り除き、どちらかが全滅していれば勝敗を確定
function removeDead(state: BattleState): void {
  state.units = state.units.filter((u) => u.hp > 0);
  if (!state.units.some((u) => u.side === 'enemy')) state.phase = 'victory';
  else if (!state.units.some((u) => u.side === 'ally')) state.phase = 'defeat';
}
