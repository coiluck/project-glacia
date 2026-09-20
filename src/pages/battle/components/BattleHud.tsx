import type { BattlePhase } from '../../../features/battle/types'
import ApPips from './ApPips'

// フェーズの表記
const PHASE_LABEL: Partial<Record<BattlePhase, string>> = {
  deployment: 'DEPLOYMENT',
  player: 'PLAYER PHASE',
  enemy: 'ENEMY PHASE',
}

const pad2 = (n: number) => String(n).padStart(2, '0')

interface BattleHudProps {
  phase: BattlePhase
  turn: number
  partyAp: number
  partyApMax: number
  spend: number // 予告中の消費AP
}

export default function BattleHud({ phase, turn, partyAp, partyApMax, spend }: BattleHudProps) {
  return (
    <div className="battle-hud">
      <div className="battle-hud-row">
        <div className="battle-hud-turn">
          <span className="battle-label">TURN</span>
          <span className="battle-num">{pad2(turn)}</span>
        </div>
        <div className={`battle-hud-phase is-${phase}`}>{PHASE_LABEL[phase]}</div>
      </div>
      <div className="battle-hud-ap battle-panel">
        <span className="battle-label">PARTY AP</span>
        <ApPips max={partyApMax} current={partyAp} spend={spend} />
        <span className="battle-num">
          {partyAp}
          <small>/{partyApMax}</small>
        </span>
      </div>
    </div>
  )
}
