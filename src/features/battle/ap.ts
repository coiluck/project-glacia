// AP（行動ポイント）の配布・消費
import type { BattleState, Side, Unit, UnitClassDef } from './types';

// 手番開始時に呼ぶ
// その陣営のユニットの個人APを配り直す
export function refillApForTurn(
  state: BattleState,
  side: Side,
  classes: Record<string, UnitClassDef>,
  partyApPerTurn: number,
): BattleState {
  const units = state.units.map((unit) => {
    if (unit.side !== side) return unit;
    const cls = classes[unit.classId];
    if (!cls) throw new Error(`Unknown unit class: ${unit.classId}`);
    return { ...unit, ap: cls.apPerTurn };
  });
  return { ...state, units, partyAp: side === 'ally' ? partyApPerTurn : state.partyAp };
}

// 味方は個人APとパーティAPの両方、敵は個人APのみを見る。
export function canSpendAp(state: BattleState, unit: Unit, cost: number): boolean {
  if (unit.ap < cost) return false;
  return unit.side !== 'ally' || state.partyAp >= cost;
}

// APを支払う
export function spendAp(state: BattleState, unitId: string, cost: number): BattleState {
  const unit = state.units.find((u) => u.id === unitId);
  if (!unit || !canSpendAp(state, unit, cost)) {
    throw new Error(
      `Cannot spend AP: unit=${unitId} cost=${cost} ap=${unit?.ap} partyAp=${state.partyAp}`,
    );
  }
  return {
    ...state,
    units: state.units.map((u) => (u.id === unitId ? { ...u, ap: u.ap - cost } : u)),
    partyAp: unit.side === 'ally' ? state.partyAp - cost : state.partyAp,
  };
}
