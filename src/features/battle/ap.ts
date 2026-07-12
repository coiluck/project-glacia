// AP（行動ポイント）の配布・消費
import type { BattleState, Side, Unit, UnitClassDef } from './types';

// 手番開始時に呼ぶ
// その陣営のユニットの個人APを配り直す
export function refillApForTurn(
  state: BattleState,
  side: Side,
  classes: Record<string, UnitClassDef>,
  partyApPerTurn: number,
): void {
  for (const unit of state.units) {
    if (unit.side !== side) continue;
    const cls = classes[unit.classId];
    if (!cls) throw new Error(`Unknown unit class: ${unit.classId}`);
    unit.ap = cls.apPerTurn;
  }
  if (side === 'ally') state.partyAp = partyApPerTurn;
}

// 味方は個人APとパーティAPの両方、敵は個人APのみを見る。
export function canSpendAp(state: BattleState, unit: Unit, cost: number): boolean {
  if (unit.ap < cost) return false;
  return unit.side !== 'ally' || state.partyAp >= cost;
}

// APを支払う
export function spendAp(state: BattleState, unit: Unit, cost: number): void {
  if (!canSpendAp(state, unit, cost)) {
    throw new Error(
      `Cannot spend AP: unit=${unit.id} cost=${cost} ap=${unit.ap} partyAp=${state.partyAp}`,
    );
  }
  unit.ap -= cost;
  if (unit.side === 'ally') state.partyAp -= cost;
}
