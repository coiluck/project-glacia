// 敵手番の自動行動
// 移動先ごとに「移動後の残りAPで攻撃したとき倒せる数・削れる総HP」をスコアにし、
// スコアが最大・同点ならAP消費が最小の位置へ移動してから攻撃する。
// スキルは nターン周期 / HPしきい値 のルールに従って発動する
import {
  aimableTilesOnBoard,
  attack,
  availableAp,
  castSkill,
  moveUnit,
  movementRange,
  skillHitsByEffect,
  unitById,
} from './battle';
import { canSpendAp } from './ap';
import { calcDamage } from './damage';
import { DIRECTION_STEPS, axialKey, distance, shapeTiles } from './hex';
import type { Axial } from './hex';
import type { BattleStageData, BattleState, TargetCount, Unit, UnitClassDef } from './types';

// 敵1体分の行動。行動後の state を返す（すでに倒されていれば state をそのまま返す）
// UI側で1体ずつ間を置いて見せる
export function actEnemy(
  state: BattleState,
  stage: BattleStageData,
  classes: Record<string, UnitClassDef>,
  unitId: string,
): BattleState {
  const unit = state.units.find((u) => u.id === unitId);
  if (!unit) return state;
  const cls = classes[unit.classId];
  if (!cls) throw new Error(`Unknown unit class: ${unit.classId}`);

  let next = state;
  // スキルを使う番なら先に発動を試みる（射程に入れる移動込み）
  if (isSkillDue(next, unit)) {
    next = trySkill(next, stage, unitId);
    if (next.phase !== 'enemy') return next;
  }

  const current = unitById(next, unitId); // trySkill で移動している可能性がある
  const plan = findBestAttackPlan(next, stage, cls, current);
  if (plan) {
    if (plan.moveCost > 0) next = moveUnit(next, stage, unitId, plan.dest);
    return executeAttacks(next, classes, cls, unitId);
  }
  // どこへ動いても攻撃できない -> 最寄りの味方に近づく
  return approachNearestAlly(next, stage, unitId);
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

// 敵のスキル使用。hpPercentは効果適用前のHP
function markSkillUsed(state: BattleState, unitId: string, hpPercent: number): BattleState {
  return {
    ...state,
    units: state.units.map((u) =>
      u.id === unitId
        ? {
            ...u,
            lastSkillTurn: state.turn,
            skillHpTriggers: u.skillHpTriggers?.filter((t) => hpPercent > t),
          }
        : u,
    ),
  };
}

// スキル発動
function trySkill(state: BattleState, stage: BattleStageData, unitId: string): BattleState {
  const unit = unitById(state, unitId);
  const skill = unit.skill;
  if (!skill) return state;
  const ap = availableAp(state, unit);
  if (ap < skill.apCost) return state;
  const hpPercentBefore = (unit.hp / unit.maxHp) * 100;

  const hasDamage = skill.effect.some((e) => e.type === 'damage');

  // 攻撃系でないスキルならいまでも使える（自分のマスを狙う）
  if (!hasDamage) {
    const next = castSkill(state, stage, unitId, unit.pos);
    return markSkillUsed(next, unitId, hpPercentBefore);
  }

  if (!state.units.some((u) => u.side === 'ally')) return state;

  // 移動先ごと・狙うマスごとの戦果で最良の組み合わせを選ぶ
  const candidates = [
    { pos: unit.pos, cost: 0 },
    ...movementRange(state, stage, unit).filter((t) => t.cost <= ap - skill.apCost),
  ];
  const unitsById = new Map(state.units.map((u) => [u.id, u] as const));
  let best: { dest: Axial; cost: number; aim: Axial; kills: number; damage: number } | undefined;
  for (const cand of candidates) {
    // 移動してから撃つので、自分だけ移動先に立たせた盤面で判定する。
    // 味方や自分に効く効果があると、術者がどのマスに居るかで当たる相手が変わる
    const board =
      cand.cost === 0
        ? state
        : {
            ...state,
            units: state.units.map((u) => (u.id === unit.id ? { ...u, pos: cand.pos } : u)),
          };
    for (const aim of aimableTilesOnBoard(stage, cand.pos, skill)) {
      // 同じ相手に複数の効果が乗ることがあるので、ユニットごとに合算してから採点する
      const damageByUnit = new Map<string, number>();
      for (const { effect, unitIds } of skillHitsByEffect(board, unit, skill, aim)) {
        if (effect.type !== 'damage') continue;
        for (const id of unitIds) {
          const target = unitsById.get(id)!;
          const sum = (damageByUnit.get(id) ?? 0) + calcDamage(unit, target, effect.power);
          damageByUnit.set(id, sum);
        }
      }
      if (damageByUnit.size === 0) continue;
      let kills = 0;
      let damage = 0;
      for (const [id, d] of damageByUnit) {
        const target = unitsById.get(id)!;
        damage += Math.min(d, target.hp); // 過剰ダメージは戦果に数えない
        if (d >= target.hp) kills += 1;
      }
      if (
        !best ||
        kills > best.kills ||
        (kills === best.kills &&
          (damage > best.damage || (damage === best.damage && cand.cost < best.cost)))
      ) {
        best = { dest: cand.pos, cost: cand.cost, aim: aim.pos, kills, damage };
      }
    }
  }
  if (!best) return state;
  let next = state;
  if (best.cost > 0) next = moveUnit(next, stage, unitId, best.dest);
  next = castSkill(next, stage, unitId, best.aim);
  return markSkillUsed(next, unitId, hpPercentBefore);
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
  const directions = cls.attackRange.kind === 'pattern' ? DIRECTION_STEPS : [0];
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
  unitId: string,
): BattleState {
  let next = state;
  for (;;) {
    const unit = next.units.find((u) => u.id === unitId);
    if (!unit || next.phase !== 'enemy' || !canSpendAp(next, unit, cls.attackCost)) return next;
    const allies = next.units.filter((u) => u.side === 'ally');
    const choice = bestAttackFrom(cls, unit, unit.pos, allies, (t) => t.hp);
    if (!choice) return next;
    next = attack(next, classes, unitId, choice.targets.map((t) => t.id), choice.direction);
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
function approachNearestAlly(
  state: BattleState,
  stage: BattleStageData,
  unitId: string,
): BattleState {
  const unit = unitById(state, unitId);
  const allies = state.units.filter((u) => u.side === 'ally');
  if (allies.length === 0) return state;
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
  return best ? moveUnit(state, stage, unitId, best.pos) : state;
}
