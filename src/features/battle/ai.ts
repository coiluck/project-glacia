// 敵手番の自動行動
// 移動先ごとに「移動後の残りAPで攻撃したとき倒せる数・削れる総HP」をスコアにし、
// スコアが最大・同点ならAP消費が最小の位置へ移動してから攻撃する。
// スキルは nターン周期 / HPしきい値 のルールに従って発動する
import { attack, availableAp, castSkill, moveUnit, movementRange } from './battle';
import { canSpendAp } from './ap';
import { calcDamage } from './damage';
import { axialKey, distance, shapeTiles } from './hex';
import type { Axial } from './hex';
import type {
  BattleStageData,
  BattleState,
  SkillEffect,
  TargetCount,
  Unit,
  UnitClassDef,
} from './types';

// 敵全員を順に行動させる。呼び出し側は phase が 'enemy' になったらこれを呼び、終わったら endTurn する
export function runEnemyTurn(
  state: BattleState,
  stage: BattleStageData,
  classes: Record<string, UnitClassDef>,
): void {
  if (state.phase !== 'enemy') throw new Error(`Not in enemy phase: ${state.phase}`);
  // 行動中に倒される可能性があるため id で追い、毎回生存確認する
  const enemyIds = state.units.filter((u) => u.side === 'enemy').map((u) => u.id);
  for (const id of enemyIds) {
    const unit = state.units.find((u) => u.id === id);
    if (!unit) continue;
    actEnemy(state, stage, classes, unit);
    if (state.phase !== 'enemy') return; // 勝敗がついた
  }
}

// 敵1体分の行動
function actEnemy(
  state: BattleState,
  stage: BattleStageData,
  classes: Record<string, UnitClassDef>,
  unit: Unit,
): void {
  const cls = classes[unit.classId];
  if (!cls) throw new Error(`Unknown unit class: ${unit.classId}`);

  // スキルを使う番なら先に発動を試みる（射程に入れる移動込み）
  if (isSkillDue(state, unit)) {
    trySkill(state, stage, unit);
    if (state.phase !== 'enemy') return;
  }

  const plan = findBestAttackPlan(state, stage, cls, unit);
  if (plan) {
    if (plan.moveCost > 0) moveUnit(state, stage, unit, plan.dest);
    executeAttacks(state, classes, cls, unit);
  } else {
    // どこへ動いても攻撃できない -> 最寄りの味方に近づく
    approachNearestAlly(state, stage, unit);
  }
}

// スキルを使う番か（nターン周期 or HPしきい値）
function isSkillDue(state: BattleState, unit: Unit): boolean {
  if (!unit.skill) return false;
  if (
    unit.skillEveryNTurns !== undefined &&
    state.turn - (unit.lastSkillTurn ?? 0) >= unit.skillEveryNTurns
  ) {
    return true;
  }
  const hpPercent = (unit.hp / unit.maxHp) * 100;
  return (unit.skillHpTriggers ?? []).some((t) => hpPercent <= t);
}

// 敵のスキル使用を記録
function markSkillUsed(state: BattleState, unit: Unit): void {
  unit.lastSkillTurn = state.turn;
  if (unit.skillHpTriggers) {
    const hpPercent = (unit.hp / unit.maxHp) * 100;
    unit.skillHpTriggers = unit.skillHpTriggers.filter((t) => hpPercent > t);
  }
}

// スキルの発動を試みる。使えたら true
function trySkill(state: BattleState, stage: BattleStageData, unit: Unit): boolean {
  const skill = unit.skill;
  if (!skill) return false;
  const ap = availableAp(state, unit);
  if (ap < skill.apCost) return false;

  const damageEffects = skill.effect.filter(
    (e): e is Extract<SkillEffect, { type: 'damage' }> => e.type === 'damage',
  );

  // 攻撃系でないスキルならいまでも使える
  if (damageEffects.length === 0) {
    castSkill(state, unit, [unit]);
    markSkillUsed(state, unit);
    return true;
  }

  const allies = state.units.filter((u) => u.side === 'ally');
  if (allies.length === 0) return false;
  const dmg = (t: Unit) =>
    damageEffects.reduce((sum, e) => sum + calcDamage(unit, t, e.power), 0);

  // 移動先ごとの戦果で最良の位置と対象を選ぶ
  const candidates = [
    { pos: unit.pos, cost: 0 },
    ...movementRange(state, stage, unit).filter((t) => t.cost <= ap - skill.apCost),
  ];
  let best:
    | { dest: Axial; cost: number; targets: Unit[]; kills: number; damage: number }
    | undefined;
  for (const cand of candidates) {
    const inRange = allies.filter((a) => distance(cand.pos, a.pos) <= skill.range);
    if (inRange.length === 0) continue;
    const targets = selectTargets(
      inRange,
      countOf(damageEffects[0].targets, inRange.length),
      dmg,
      (t) => t.hp,
    );
    let kills = 0;
    let damage = 0;
    for (const t of targets) {
      const d = Math.min(dmg(t), t.hp); // 過剰ダメージは戦果に数えない
      damage += d;
      if (d >= t.hp) kills += 1;
    }
    if (
      !best ||
      kills > best.kills ||
      (kills === best.kills &&
        (damage > best.damage || (damage === best.damage && cand.cost < best.cost)))
    ) {
      best = { dest: cand.pos, cost: cand.cost, targets, kills, damage };
    }
  }
  if (!best) return false;
  if (best.cost > 0) moveUnit(state, stage, unit, best.dest);
  castSkill(state, unit, best.targets);
  markSkillUsed(state, unit);
  return true;
}

// 通常攻撃
interface AttackPlan {
  dest: Axial;
  moveCost: number;
  kills: number;
  damage: number;
}

// 全移動先を「移動後の残りAPで攻撃し続けたときの戦果」で採点して最良を返す
// 攻撃用APが残らない移動先は候補にしない。どこからも攻撃できなければundefined
function findBestAttackPlan(
  state: BattleState,
  stage: BattleStageData,
  cls: UnitClassDef,
  unit: Unit,
): AttackPlan | undefined {
  const ap = availableAp(state, unit);
  if (ap < cls.attackCost) return undefined;
  const allies = state.units.filter((u) => u.side === 'ally');
  if (allies.length === 0) return undefined;

  const candidates = [
    { pos: unit.pos, cost: 0 },
    ...movementRange(state, stage, unit).filter((t) => t.cost <= ap - cls.attackCost),
  ];
  let best: AttackPlan | undefined;
  for (const cand of candidates) {
    const attackCount = Math.floor((ap - cand.cost) / cls.attackCost);
    const { kills, damage } = simulateAttacks(cls, unit, cand.pos, allies, attackCount);
    if (damage <= 0) continue;
    if (
      !best ||
      kills > best.kills ||
      (kills === best.kills &&
        (damage > best.damage || (damage === best.damage && cand.cost < best.moveCost)))
    ) {
      best = { dest: cand.pos, moveCost: cand.cost, kills, damage };
    }
  }
  return best;
}

// pos から attackCount 回攻撃したときの戦果を見積もる
function simulateAttacks(
  cls: UnitClassDef,
  unit: Unit,
  pos: Axial,
  allies: Unit[],
  attackCount: number,
): { kills: number; damage: number } {
  const hp = new Map(allies.map((a) => [a.id, a.hp] as const));
  const hpOf = (t: Unit) => hp.get(t.id) ?? 0;
  let kills = 0;
  let damage = 0;
  for (let i = 0; i < attackCount; i++) {
    const choice = bestAttackFrom(cls, unit, pos, allies, hpOf);
    if (!choice) break;
    kills += choice.kills;
    damage += choice.damage;
    for (const t of choice.targets) {
      hp.set(t.id, Math.max(0, hpOf(t) - calcDamage(unit, t, cls.attackPower)));
    }
  }
  return { kills, damage };
}

interface AttackChoice {
  direction: number;
  targets: Unit[];
  kills: number;
  damage: number;
}

// pos からの1回の攻撃で最も戦果が大きい向きと対象を選ぶ。pattern 型は6方向試す
function bestAttackFrom(
  cls: UnitClassDef,
  unit: Unit,
  pos: Axial,
  allies: Unit[],
  hpOf: (t: Unit) => number,
): AttackChoice | undefined {
  const directions = cls.attackRange.kind === 'pattern' ? [0, 1, 2, 3, 4, 5] : [0];
  let best: AttackChoice | undefined;
  for (const direction of directions) {
    const area = new Set(shapeTiles(pos, cls.attackRange, direction).map(axialKey));
    const inRange = allies.filter((a) => hpOf(a) > 0 && area.has(axialKey(a.pos)));
    if (inRange.length === 0) continue;
    const targets = selectTargets(
      inRange,
      countOf(cls.attackTargets, inRange.length),
      (t) => calcDamage(unit, t, cls.attackPower),
      hpOf,
    );
    let kills = 0;
    let damage = 0;
    for (const t of targets) {
      const d = Math.min(calcDamage(unit, t, cls.attackPower), hpOf(t));
      damage += d;
      if (d >= hpOf(t)) kills += 1;
    }
    if (!best || kills > best.kills || (kills === best.kills && damage > best.damage)) {
      best = { direction, targets, kills, damage };
    }
  }
  return best;
}

// 現在位置からAPが続く限り攻撃する
function executeAttacks(
  state: BattleState,
  classes: Record<string, UnitClassDef>,
  cls: UnitClassDef,
  unit: Unit,
): void {
  while (state.phase === 'enemy' && canSpendAp(state, unit, cls.attackCost)) {
    const allies = state.units.filter((u) => u.side === 'ally');
    const choice = bestAttackFrom(cls, unit, unit.pos, allies, (t) => t.hp);
    if (!choice) return;
    attack(state, classes, unit, choice.targets, choice.direction);
  }
}

// 倒せる相手を優先し、残り枠は削れるHPが大きい順に選ぶ
function selectTargets(
  candidates: Unit[],
  count: number,
  dmg: (t: Unit) => number,
  hpOf: (t: Unit) => number,
): Unit[] {
  const sorted = [...candidates].sort((a, b) => {
    const killA = dmg(a) >= hpOf(a) ? 1 : 0;
    const killB = dmg(b) >= hpOf(b) ? 1 : 0;
    if (killA !== killB) return killB - killA;
    return Math.min(dmg(b), hpOf(b)) - Math.min(dmg(a), hpOf(a));
  });
  return sorted.slice(0, count);
}

// 対象数の上限を実数に直す
function countOf(limit: TargetCount, available: number): number {
  return limit === 'infinity' ? available : Math.min(limit, available);
}

// 攻撃もスキルも撃てないターンのフォールバック。最寄りの味方との距離が最小になるマスへ移動する
function approachNearestAlly(state: BattleState, stage: BattleStageData, unit: Unit): void {
  const allies = state.units.filter((u) => u.side === 'ally');
  if (allies.length === 0) return;
  const distToNearest = (pos: Axial) => Math.min(...allies.map((a) => distance(pos, a.pos)));
  const current = distToNearest(unit.pos);
  let best: { pos: Axial; cost: number; d: number } | undefined;
  for (const option of movementRange(state, stage, unit)) {
    const d = distToNearest(option.pos);
    if (d >= current) continue;
    if (!best || d < best.d || (d === best.d && option.cost < best.cost)) {
      best = { pos: option.pos, cost: option.cost, d };
    }
  }
  if (best) moveUnit(state, stage, unit, best.pos);
}
