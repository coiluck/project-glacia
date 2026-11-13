import { characterMasters } from '../../../src/data/characters';
import { LIMIT_BREAK_LEVELS, MAX_LEVEL } from '../../../src/data/characters/const';
import { enemyDefs } from '../../../src/data/enemies';
import { enemyPhaseSteps } from '../../../src/features/battle/ai';
import { canSpendAp } from '../../../src/features/battle/ap';
import {
  aimableTilesOnBoard,
  attack,
  availableAp,
  castSkill,
  createBattleState,
  deployAlly,
  movementRange,
  moveUnit,
  startBattle,
} from '../../../src/features/battle/battle';
import { NORMAL_ATTACK_POWER, calcDamage } from '../../../src/features/battle/damage';
import { axialKey, distance, neighbors, shapeTiles, type Axial } from '../../../src/features/battle/hex';
import { isPassable } from '../../../src/features/battle/terrain';
import type { BattleStageData, BattleState, Unit } from '../../../src/features/battle/types';
import { toCharacterDef, type PartyMember } from '../../../src/features/characters/build';
import { resolveCharacter } from '../../../src/features/characters/resolve';

// 難易度を見るために、味方を貪欲に動かして戦闘を最後まで回すボット
// 人より下手なので、ボットが勝てるならそのステージは人にも勝てる
// 1手ごとに「倒せる数・削れる HP・回復した HP」から「次の敵の手番で受けそうなダメージ」を引いた点が最も高い行動を選ぶ
// 敵を削れないターンが2回続いたら、危険を見ずに攻め、敵へ歩いて寄る

const enemiesOf = (s: BattleState) => s.units.filter((u) => u.side === 'enemy');
const alliesOf = (s: BattleState) => s.units.filter((u) => u.side === 'ally');
const totalHp = (units: Unit[]) => units.reduce((sum, u) => sum + u.hp, 0);

// 凸0・スキルは1つめ。Lv はレアリティの上限で止め、越えた壁のぶんだけ上限解放する
function allyAt(masterId: string, level: number) {
  const master = characterMasters[masterId];
  const lv = Math.min(level, MAX_LEVEL[master.rarity]);
  const resolved = resolveCharacter(master, {
    masterId,
    level: lv,
    exp: 0,
    limitBreak: LIMIT_BREAK_LEVELS[master.rarity].filter((wall) => lv > wall).length,
    dupe: 0,
    selectedSkillId: master.skills[0].def.id,
    skillLevels: {},
  });
  return { character: toCharacterDef(resolved), skill: resolved.selectedSkill.def };
}

// 剣士・魔導士・弓兵の順に、敵に近い配置マスから置く
const CLASS_ORDER: Record<string, number> = { soldier: 0, mage: 1, archer: 2 };

function deploy(stage: BattleStageData, party: PartyMember[]): BattleState {
  let state = createBattleState(stage, enemyDefs);
  const toEnemy = (p: Axial) => Math.min(...stage.enemies.map((e) => distance(p, e.pos)));
  const tiles = [...stage.deployableTiles].sort((a, b) => toEnemy(a) - toEnemy(b));
  const members = [...party].sort(
    (a, b) => CLASS_ORDER[a.character.classId] - CLASS_ORDER[b.character.classId] || b.character.hp - a.character.hp,
  );
  members.forEach((m, i) => {
    state = deployAlly(state, stage, m.character, m.skill, tiles[i]);
  });
  return startBattle(state, stage);
}

// ally が pos に立っていたとき、次の敵の手番で受けそうなダメージ。壁は見ず、直線距離で寄れるとみなす
function threat(state: BattleState, ally: Unit, pos: Axial): number {
  let sum = 0;
  for (const e of enemiesOf(state)) {
    const cls = e.unitClass;
    const reach = cls.attackRange.kind === 'range' ? cls.attackRange.max : 1;
    const left = cls.apPerTurn - Math.max(0, distance(e.pos, pos) - reach);
    if (left < cls.attackCost) continue;
    sum += calcDamage(e, ally, NORMAL_ATTACK_POWER) * Math.floor(left / cls.attackCost);
  }
  return sum >= ally.hp ? ally.hp * 1.5 : sum;
}

function score(before: BattleState, after: BattleState, allyId: string, riskWeight: number): number {
  const hpAfter = new Map(after.units.map((u) => [u.id, u.hp] as const));
  let damage = 0;
  let kills = 0;
  for (const e of enemiesOf(before)) {
    const hp = hpAfter.get(e.id) ?? 0;
    damage += e.hp - hp;
    if (hp === 0) kills += 1;
  }
  let heal = 0;
  for (const a of alliesOf(before)) heal += Math.max(0, (hpAfter.get(a.id) ?? 0) - a.hp);
  if (damage === 0 && heal === 0) return -Infinity;
  const me = before.units.find((u) => u.id === allyId)!;
  const moved = after.units.find((u) => u.id === allyId)!;
  const risk = threat(after, moved, moved.pos) - threat(before, me, me.pos);
  return kills * 600 + damage + heal * 0.7 - risk * riskWeight;
}

// ally が1マスへ動いてから1回攻撃するかスキルを撃つ、すべての手
function candidates(state: BattleState, stage: BattleStageData, ally: Unit): BattleState[] {
  const out: BattleState[] = [];
  for (const dest of [{ pos: ally.pos, cost: 0 }, ...movementRange(state, stage, ally)]) {
    const moved = dest.cost === 0 ? state : moveUnit(state, stage, ally.id, dest.pos);
    const me = moved.units.find((u) => u.id === ally.id)!;
    if (canSpendAp(moved, me, me.unitClass.attackCost)) {
      const area = new Set(shapeTiles(me.pos, me.unitClass.attackRange).map(axialKey));
      for (const e of enemiesOf(moved)) {
        if (area.has(axialKey(e.pos))) out.push(attack(moved, me.id, [e.id]));
      }
    }
    if (me.skill && canSpendAp(moved, me, me.skill.apCost)) {
      for (const aim of aimableTilesOnBoard(stage, me.pos, me.skill)) {
        const next = castSkill(moved, stage, me.id, aim.pos);
        if (next !== moved) out.push(next);
      }
    }
  }
  return out;
}

// 敵のいるマスからの歩く距離。ユニットは障害物にしない
function walkDistance(stage: BattleStageData, from: Axial[]): Map<string, number> {
  const passable = new Set(stage.tiles.filter(isPassable).map((t) => axialKey(t.pos)));
  const dist = new Map<string, number>(from.map((p) => [axialKey(p), 0]));
  const queue = [...from];
  while (queue.length) {
    const p = queue.shift()!;
    for (const n of neighbors(p)) {
      const key = axialKey(n);
      if (dist.has(key) || !passable.has(key)) continue;
      dist.set(key, dist.get(axialKey(p))! + 1);
      queue.push(n);
    }
  }
  return dist;
}

// 味方の手番1回ぶん。敵の HP を削れたかを一緒に返す
function playerTurn(state: BattleState, stage: BattleStageData, stalled: boolean): { state: BattleState; dealt: boolean } {
  const riskWeight = stalled ? 0 : 0.5;
  const enemyHp = totalHp(enemiesOf(state));
  for (;;) {
    let best: { next: BattleState; value: number } | undefined;
    for (const ally of alliesOf(state)) {
      if (availableAp(state, ally) <= 0) continue;
      for (const next of candidates(state, stage, ally)) {
        const value = score(state, next, ally.id, riskWeight);
        if (value > 0 && (!best || value > best.value)) best = { next, value };
      }
    }
    if (!best) break;
    state = best.next;
    if (state.phase !== 'player') return { state, dealt: true };
  }
  const dealt = totalHp(enemiesOf(state)) < enemyHp;
  if (!dealt && stalled) {
    const walk = walkDistance(stage, enemiesOf(state).map((e) => e.pos));
    const toEnemy = (p: Axial) => walk.get(axialKey(p)) ?? Infinity;
    for (const { id } of alliesOf(state)) {
      const ally = state.units.find((u) => u.id === id)!;
      const [step] = movementRange(state, stage, ally)
        .filter((t) => t.cost <= 2)
        .sort((a, b) => toEnemy(a.pos) - toEnemy(b.pos) || a.cost - b.cost);
      if (step && toEnemy(step.pos) < toEnemy(ally.pos)) state = moveUnit(state, stage, id, step.pos);
    }
  }
  return { state, dealt };
}

export interface BotResult {
  victory: boolean;
  turns: number;
  lost: number; // 倒された味方の数
}

// party（キャラの id）を全員 level にして、maxTurns ターンまで戦う。決着しなければ負け
export function playWithBot(stage: BattleStageData, party: string[], level: number, maxTurns = 30): BotResult {
  return playParty(stage, party.map((id) => allyAt(id, level)), maxTurns);
}

// 組み終えた編成で戦う。tests/level-design/ が所持データ（凸・スキル Lv 込み）の編成を渡す
export function playParty(stage: BattleStageData, party: PartyMember[], maxTurns = 30): BotResult {
  let state = deploy(stage, party);
  let stalledTurns = 0;
  while (state.phase === 'player' && state.turn <= maxTurns) {
    const turn = playerTurn(state, stage, stalledTurns >= 2);
    state = turn.state;
    if (state.phase !== 'player') break;
    for (const next of enemyPhaseSteps(state, stage)) state = next;
    stalledTurns = turn.dealt ? 0 : stalledTurns + 1;
  }
  return {
    victory: state.phase === 'victory',
    turns: state.turn,
    lost: party.length - alliesOf(state).length,
  };
}
