// 戦闘の初期化・アクション実行（移動/通常攻撃/スキル）・ターン進行・勝敗判定
// すべて純粋関数。state は変更せず新しい state を返す。
// ユニットの参照は id で受ける（更新のたびにオブジェクトが作り直されるため）
import { axialKey, effectTiles, reachable, shapeAimsAnyDirection, shapeTiles } from './hex';
import type { AimTile, Axial } from './hex';
import { canSpendAp, refillApForTurn, spendAp } from './ap';
import { isPassable } from './terrain';
import { calcDamage } from './damage';
import type {
  BattleStageData,
  BattleState,
  CharacterDef,
  EnemyDef,
  SkillDef,
  SkillEffect,
  Unit,
  UnitClassDef,
} from './types';

// 指定座標に居るユニット
export function unitAt(state: BattleState, pos: Axial): Unit | undefined {
  return state.units.find((u) => u.pos.q === pos.q && u.pos.r === pos.r);
}

// id からユニットを引く。盤面に居なければ throw
export function unitById(state: BattleState, unitId: string): Unit {
  const unit = state.units.find((u) => u.id === unitId);
  if (!unit) throw new Error(`Unknown unit: ${unitId}`);
  return unit;
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
): BattleState {
  if (state.phase !== 'deployment') throw new Error(`Not in deployment phase: ${state.phase}`);
  const deployable = stage.deployableTiles.some((t) => t.q === pos.q && t.r === pos.r);
  if (!deployable || unitAt(state, pos)) {
    throw new Error(`Cannot deploy at (${pos.q},${pos.r})`);
  }
  const unit: Unit = {
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
  };
  return { ...state, units: [...state.units, unit] };
}

// 配置済みの味方を外す（配置のやり直し用）
export function undeployAlly(state: BattleState, unitId: string): BattleState {
  if (state.phase !== 'deployment') throw new Error(`Not in deployment phase: ${state.phase}`);
  if (unitById(state, unitId).side !== 'ally') throw new Error(`Not an ally: ${unitId}`);
  return { ...state, units: state.units.filter((u) => u.id !== unitId) };
}

// 配置を確定して戦闘を開始
export function startBattle(
  state: BattleState,
  stage: BattleStageData,
  classes: Record<string, UnitClassDef>,
): BattleState {
  if (state.phase !== 'deployment') throw new Error(`Not in deployment phase: ${state.phase}`);
  if (!state.units.some((u) => u.side === 'ally')) throw new Error('No allies deployed');
  return refillApForTurn(
    { ...state, phase: 'player', turn: 1 },
    'ally',
    classes,
    stage.partyApPerTurn,
  );
}

// 移動
// 必要APと移動できるマス
export function movementRange(
  state: BattleState,
  stage: BattleStageData,
  unit: Unit,
): { pos: Axial; cost: number }[] {
  const tiles = new Set(stage.tiles.filter(isPassable).map((t) => axialKey(t.pos)));
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
  unitId: string,
  dest: Axial,
): BattleState {
  const unit = unitById(state, unitId);
  const entry = movementRange(state, stage, unit).find(
    (t) => t.pos.q === dest.q && t.pos.r === dest.r,
  );
  if (!entry) throw new Error(`Cannot move to (${dest.q},${dest.r})`);
  const next = spendAp(state, unitId, entry.cost);
  return {
    ...next,
    units: next.units.map((u) => (u.id === unitId ? { ...u, pos: dest } : u)),
  };
}

// 通常攻撃
// targetIds は攻撃範囲内からUI側で選んだ相手。pattern型の範囲は direction（0〜5）で回転
export function attack(
  state: BattleState,
  classes: Record<string, UnitClassDef>,
  attackerId: string,
  targetIds: string[],
  direction = 0,
): BattleState {
  const attacker = unitById(state, attackerId);
  const cls = classes[attacker.classId];
  if (!cls) throw new Error(`Unknown unit class: ${attacker.classId}`);
  if (!canSpendAp(state, attacker, cls.attackCost)) throw new Error('Not enough AP');
  if (typeof cls.attackTargets === 'number' && targetIds.length > cls.attackTargets) {
    throw new Error(`Too many targets: ${targetIds.length} > ${cls.attackTargets}`);
  }
  const area = new Set(shapeTiles(attacker.pos, cls.attackRange, direction).map(axialKey));
  for (const id of targetIds) {
    const target = unitById(state, id);
    if (target.side === attacker.side || !area.has(axialKey(target.pos))) {
      throw new Error(`Invalid target: ${id}`);
    }
  }
  const next = spendAp(state, attackerId, cls.attackCost);
  const hitIds = new Set(targetIds);
  return removeDead({
    ...next,
    units: next.units.map((u) =>
      hitIds.has(u.id) ? { ...u, hp: Math.max(0, u.hp - calcDamage(attacker, u, cls.attackPower)) } : u,
    ),
  });
}

// スキル

// 狙えるマスと、そこを狙ったときの効果の向き
// 自分のマスは射程の形に関わらず常に狙える。誰に当たるかは効果の target と area が決めるので、
// 「自分を狙う意味があるか」をここで判定しない（自分中心の範囲攻撃も target は enemy になる）
export function aimableTiles(from: Axial, skill: SkillDef): AimTile[] {
  const aims = shapeAimsAnyDirection(from, skill.range);
  // 射程の形がすでに自分のマスを含むなら、その向きを活かして二重に足さない
  const fromKey = axialKey(from);
  if (aims.some((a) => axialKey(a.pos) === fromKey)) return aims;
  return [{ pos: from, direction: 0 }, ...aims];
}

// 盤面に存在するマスだけに絞った狙えるマス。
// UI・AI・castSkill の検証がこれを共通で使う
export function aimableTilesOnBoard(
  stage: BattleStageData,
  from: Axial,
  skill: SkillDef,
): AimTile[] {
  const tiles = new Set(stage.tiles.map((t) => axialKey(t.pos)));
  return aimableTiles(from, skill).filter((a) => tiles.has(axialKey(a.pos)));
}

// スキルが影響しうるマスすべてのマス
// 編成画面のプレビューが使う
export function skillReach(skill: SkillDef): Axial[] {
  const origin: Axial = { q: 0, r: 0 };
  const seen = new Set<string>();
  const result: Axial[] = [];
  for (const aim of aimableTiles(origin, skill)) {
    for (const effect of skill.effect) {
      for (const c of effectTiles(aim.pos, effect.area, aim.direction)) {
        const key = axialKey(c);
        if (seen.has(key)) continue;
        seen.add(key);
        result.push(c);
      }
    }
  }
  return result;
}

// aim へ撃ったとき、効果ごとに当たるユニットID
// state を引数で受けるのは、AIが移動後の盤面を仮定して評価するため
export function skillHitsByEffect(
  state: BattleState,
  user: Unit,
  skill: SkillDef,
  aim: AimTile,
): { effect: SkillEffect; unitIds: string[] }[] {
  const matchTarget = (t: Unit, target: 'self' | 'ally' | 'enemy') =>
    target === 'self' ? t.id === user.id : (t.side === user.side) === (target === 'ally');
  return skill.effect.map((effect) => {
    const area = new Set(effectTiles(aim.pos, effect.area, aim.direction).map(axialKey));
    return {
      effect,
      unitIds: state.units
        .filter((u) => area.has(axialKey(u.pos)) && matchTarget(u, effect.target))
        .map((u) => u.id),
    };
  });
}

// 1体でも当たるか。空振りにAPを払わせないための判定を1か所にまとめる
export function skillHitsAnyone(
  state: BattleState,
  user: Unit,
  skill: SkillDef,
  aim: AimTile,
): boolean {
  return skillHitsByEffect(state, user, skill, aim).some((h) => h.unitIds.length > 0);
}

// aim は射程内からUI側で選んだ狙うマス。
// 誰にも当たらないマスを狙ったときは何も起きない（APも減らない）
export function castSkill(
  state: BattleState,
  stage: BattleStageData,
  userId: string,
  aim: Axial,
): BattleState {
  const user = unitById(state, userId);
  const skill = user.skill;
  if (!skill) throw new Error(`Unit has no skill: ${userId}`);
  if (!canSpendAp(state, user, skill.apCost)) throw new Error('Not enough AP');
  const aimKey = axialKey(aim);
  const target = aimableTilesOnBoard(stage, user.pos, skill).find(
    (a) => axialKey(a.pos) === aimKey,
  );
  if (!target) throw new Error(`Out of range: (${aim.q},${aim.r})`);

  // 効果を順に適用しても当たる相手は変わらないので、先にまとめて出す
  const hits = skillHitsByEffect(state, user, skill, target);
  if (!hits.some((h) => h.unitIds.length > 0)) return state;

  let next = spendAp(state, userId, skill.apCost);
  const dead = new Set<string>(); // 効果の並び順で死体が回復・強化されないよう外していく
  for (const { effect, unitIds } of hits) {
    const hitIds = new Set(unitIds.filter((id) => !dead.has(id)));
    next = {
      ...next,
      units: next.units.map((u) => {
        if (!hitIds.has(u.id)) return u;
        switch (effect.type) {
          case 'damage':
            return { ...u, hp: Math.max(0, u.hp - calcDamage(user, u, effect.power)) };
          case 'healHp':
            return { ...u, hp: Math.min(u.maxHp, u.hp + effect.amount) };
          case 'grantAp':
            return { ...u, ap: u.ap + effect.amount };
        }
      }),
    };
    for (const u of next.units) {
      if (u.hp <= 0) dead.add(u.id);
    }
  }
  return removeDead(next);
}

// ターン進行
export function endTurn(
  state: BattleState,
  stage: BattleStageData,
  classes: Record<string, UnitClassDef>,
): BattleState {
  if (state.phase === 'player') {
    return refillApForTurn({ ...state, phase: 'enemy' }, 'enemy', classes, stage.partyApPerTurn);
  }
  if (state.phase === 'enemy') {
    return refillApForTurn(
      { ...state, phase: 'player', turn: state.turn + 1 },
      'ally',
      classes,
      stage.partyApPerTurn,
    );
  }
  throw new Error(`Cannot end turn in phase: ${state.phase}`);
}

// HP0のユニットを取り除き、どちらかが全滅していれば勝敗を確定
function removeDead(state: BattleState): BattleState {
  const units = state.units.filter((u) => u.hp > 0);
  const phase = !units.some((u) => u.side === 'enemy')
    ? 'victory'
    : !units.some((u) => u.side === 'ally')
      ? 'defeat'
      : state.phase;
  return { ...state, units, phase };
}
