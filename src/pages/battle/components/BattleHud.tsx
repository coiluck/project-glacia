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
  turnLabel: string
  partyApLabel: string
}

export default function BattleHud({ phase, turn, partyAp, partyApMax, spend, turnLabel, partyApLabel }: BattleHudProps) {
  return (
    <div className="battle-hud">
      <div className="battle-hud-turn">
        <span className="battle-hud-turn-label">{turnLabel}</span>
        <span className="battle-num">{pad2(turn)}</span>
        <div className={`battle-hud-phase is-${phase}`}>{PHASE_LABEL[phase]}</div>
      </div>
      <div className="battle-hud-ap" data-guide="party-ap">
        <span className="battle-hud-ap-label">{partyApLabel}</span>
        <ApPips max={partyApMax} current={partyAp} spend={spend} />
        <span className="battle-num">
          {partyAp}
          <small>/{partyApMax}</small>
        </span>
      </div>
    </div>
  )
}
