import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { paths } from '../../router/paths'
import { useTranslations } from '../../i18n'
import { battleStageRegistry } from '../../data/battleStages'
import { characters, testParty } from '../../data/characters'
import { enemyDefs } from '../../data/enemies'
import { unitClasses } from '../../data/unitClasses'
import { availableAp, movementRange } from '../../features/battle/battle'
import { useBattleStore } from '../../features/battle/battleStore'
import { axialKey, coordsInRange, shapeTiles } from '../../features/battle/hex'
import type { Axial } from '../../features/battle/hex'
import type { Side, SkillDef, Unit } from '../../features/battle/types'
import HexGrid from './components/HexGrid'
import ViewportLayer from '../../layouts/ViewportLayer'

// i18n
const TRANSLATION_MAPPING = Object.fromEntries(
  [
    ...Object.values(unitClasses).map((c) => c.nameKey),
    ...Object.values(characters).map((c) => c.nameKey),
    ...Object.values(characters).flatMap((c) => c.skills.map((s) => s.nameKey)),
    ...Object.values(enemyDefs).map((e) => e.nameKey),
    ...Object.values(enemyDefs).flatMap((e) => (e.skill ? [e.skill.def.nameKey] : [])),
    'deployHint',
    'startBattle',
    'endTurn',
    'undoTurn',
    'attack',
    'skill',
    'cancel',
    'turn',
    'partyAp',
    'victory',
    'defeat',
    'backToMap',
  ].map((k) => [k, k]),
)

// 選択中ユニットに対して指示できる行動
type ActionMode = 'move' | 'attack' | 'skill'

// 盤面タイルのハイライト種別
export type HighlightKind = 'deploy' | 'move' | 'attack' | 'skill'

// スキルの対象にできる陣営
// 味方のSkillDefでのみこれを呼ぶ（表示用なので）
function skillTargetSide(skill: SkillDef): Side {
  const damage = skill.effect.find((e) => e.type === 'damage')
  return damage && damage.target === 'enemy' ? 'enemy' : 'ally'
}

export default function BattlePage() {
  const { stageId } = useParams<{ stageId: string }>()
  return <BattleScreen key={stageId} stageId={stageId} />
}

function BattleScreen({ stageId }: { stageId: string | undefined }) {
  const t = useTranslations('battle', TRANSLATION_MAPPING)
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null)
  const [action, setAction] = useState<ActionMode>('move')
  const [deployIndex, setDeployIndex] = useState(0)

  const stage = useBattleStore((s) => s.stage)
  const state = useBattleStore((s) => s.state)
  const init = useBattleStore((s) => s.init)
  const deploy = useBattleStore((s) => s.deploy)
  const undeploy = useBattleStore((s) => s.undeploy)
  const start = useBattleStore((s) => s.start)
  const move = useBattleStore((s) => s.move)
  const doAttack = useBattleStore((s) => s.doAttack)
  const doSkill = useBattleStore((s) => s.doSkill)
  const undoTurn = useBattleStore((s) => s.undoTurn)
  const endPlayerTurn = useBattleStore((s) => s.endPlayerTurn)

  // マウント時に戦闘状態を作り直す
  useEffect(() => {
    init(stageId)
  }, [stageId, init])

  if (!stage || !state) {
    // init 前の1フレームは何も描かない。レジストリに無いステージだけ NO DATA を出す
    if (stageId && battleStageRegistry[stageId]) return null
    return (
      <div className="page-battle">
        <div className="battle-result">
          <div className="battle-result-title">STAGE {stageId} — NO DATA</div>
          <Link className="battle-result-button" to={paths.story}>
            {t.backToMap}
          </Link>
        </div>
      </div>
    )
  }

  const classes = unitClasses
  const selectedUnit = state.units.find((u) => u.id === selectedUnitId) ?? null

  // createBattleState / deployAlly の `enemy-{i}-{defId}` / `ally-{charId}` という命名規則に依存
  const unitNameKey = (unit: Unit): string => {
    if (unit.side === 'ally') return characters[unit.id.slice('ally-'.length)]?.nameKey ?? unit.id
    return enemyDefs[unit.id.split('-').slice(2).join('-')]?.nameKey ?? unit.id
  }
  const getUnitName = (unit: Unit) => t[unitNameKey(unit)] ?? ''

  const isDeployed = (charId: string) => state.units.some((u) => u.id === `ally-${charId}`)

  // タイルのハイライトを算出
  const highlights = new Map<string, HighlightKind>()
  if (state.phase === 'deployment') {
    const occupied = new Set(state.units.map((u) => axialKey(u.pos)))
    if (testParty.some((m) => !isDeployed(m.character.id))) {
      for (const pos of stage.deployableTiles) {
        if (!occupied.has(axialKey(pos))) highlights.set(axialKey(pos), 'deploy')
      }
    }
  } else if (state.phase === 'player' && selectedUnit?.side === 'ally') {
    const tileSet = new Set(stage.tiles.map((t) => axialKey(t.pos)))
    if (action === 'move') {
      for (const { pos } of movementRange(state, stage, selectedUnit)) {
        highlights.set(axialKey(pos), 'move')
      }
    } else if (action === 'attack') {
      for (const pos of shapeTiles(selectedUnit.pos, classes[selectedUnit.classId].attackRange)) {
        if (tileSet.has(axialKey(pos))) highlights.set(axialKey(pos), 'attack')
      }
    } else if (action === 'skill' && selectedUnit.skill) {
      for (const pos of coordsInRange(selectedUnit.pos, selectedUnit.skill.range)) {
        if (tileSet.has(axialKey(pos))) highlights.set(axialKey(pos), 'skill')
      }
    }
  }

  const deselect = () => {
    setSelectedUnitId(null)
    setAction('move')
  }

  const handleTileClick = (pos: Axial) => {
    const key = axialKey(pos)
    if (state.phase === 'deployment') {
      if (highlights.get(key) !== 'deploy') return
      const member = testParty[deployIndex]
      if (!member || isDeployed(member.character.id)) return
      deploy(member.character, member.skill, pos)
      // 次の未配置メンバーを自動選択（配置直後の最新 state から判定する）
      const latest = useBattleStore.getState().state
      const next = testParty.findIndex(
        (m) => !latest?.units.some((u) => u.id === `ally-${m.character.id}`),
      )
      if (next !== -1) setDeployIndex(next)
      return
    }
    if (state.phase !== 'player') return
    if (selectedUnit?.side === 'ally' && action === 'move' && highlights.get(key) === 'move') {
      move(selectedUnit.id, pos)
      return
    }
    deselect() // 関係ないタイル -> 選択解除
  }

  const handleUnitClick = (unit: Unit) => {
    if (state.phase === 'deployment') {
      if (unit.side === 'ally') {
        // 配置済みの味方をタップで配置解除し、そのメンバーを再選択
        undeploy(unit.id)
        const index = testParty.findIndex((m) => `ally-${m.character.id}` === unit.id)
        if (index !== -1) setDeployIndex(index)
        setSelectedUnitId(null)
      } else {
        setSelectedUnitId(unit.id) // 敵の情報を見る
      }
      return
    }
    if (state.phase !== 'player') return
    const key = axialKey(unit.pos)
    if (selectedUnit?.side === 'ally') {
      if (action === 'attack' && unit.side === 'enemy' && highlights.get(key) === 'attack') {
        doAttack(selectedUnit.id, [unit.id])
        setAction('move')
        return
      }
      if (
        action === 'skill' &&
        selectedUnit.skill &&
        highlights.get(key) === 'skill' &&
        unit.side === skillTargetSide(selectedUnit.skill)
      ) {
        doSkill(selectedUnit.id, [unit.id])
        setAction('move')
        return
      }
    }
    // 選択の切り替えのみ
    setSelectedUnitId(unit.id)
    setAction('move')
  }

  const handleSkillButton = () => {
    if (!selectedUnit?.skill) return
    // 射程0は自分が対象
    if (selectedUnit.skill.range === 0) {
      doSkill(selectedUnit.id, [selectedUnit.id])
      setAction('move')
    } else {
      setAction(action === 'skill' ? 'move' : 'skill')
    }
  }

  const handleEndTurn = () => {
    deselect()
    void endPlayerTurn() // 敵の逐次行動は非同期で進む
  }

  const handleUndoTurn = () => {
    deselect()
    undoTurn()
  }

  const selectedClass = selectedUnit ? classes[selectedUnit.classId] : null
  const canAttack =
    selectedUnit && selectedClass
      ? availableAp(state, selectedUnit) >= selectedClass.attackCost
      : false
  const canSkill =
    selectedUnit?.skill != null && availableAp(state, selectedUnit) >= selectedUnit.skill.apCost

  return (
    <>
      <ViewportLayer>
        {/* ターン表示 */}
        {state.phase !== 'deployment' &&
          <div className="battle-hud-turn" key={state.turn}>
            Turn {state.turn}
          </div>
        }

        {/* 敵ターン中の画面 */}
        {state.phase === 'enemy' &&
          <div className="battle-hud-enemy-turn-overlay" />
        }

        {/* 背景 */}
        <div className="battle-hud-background" />
      </ViewportLayer>


      <div className="page-battle">
        {/* 盤面 */}
        <div className="battle-board-area">
          <HexGrid
            tiles={stage.tiles}
            units={state.units}
            highlights={highlights}
            selectedUnitId={selectedUnitId}
            getUnitName={getUnitName}
            onTileClick={handleTileClick}
            onUnitClick={handleUnitClick}
          />
        </div>

        {/* 配置フェーズ用 */}
        {state.phase === 'deployment' && (
          <div className="battle-deploy-panel">
            <p className="battle-deploy-hint">{t.deployHint}</p>
            <div className="battle-deploy-members">
              {testParty.map((m, i) => {
                const deployed = isDeployed(m.character.id)
                  return (
                  <button
                    key={m.character.id}
                    className={`battle-deploy-member${i === deployIndex ? ' is-active' : ''}${deployed ? ' is-deployed' : ''}`}
                    disabled={deployed}
                    onClick={() => setDeployIndex(i)}
                  >
                    <span className="battle-deploy-member-name">{t[m.character.nameKey]}</span>
                    <span className="battle-deploy-member-class">
                      {t[classes[m.character.classId].nameKey]}
                    </span>
                  </button>
                )
              })}
            </div>
            <button
              className="battle-button battle-start-button"
              disabled={!state.units.some((u) => u.side === 'ally')}
              onClick={start}
            >
              {t.startBattle}
            </button>
          </div>
        )}

        {/* 選択中ユニットの情報（配置中は敵の下見にも使う） */}
        {(state.phase === 'player' || state.phase === 'deployment') &&
          selectedUnit &&
          selectedClass && (
            <div className="battle-unit-panel">
              <div className="battle-unit-panel-name">
                {getUnitName(selectedUnit)}
                <span className="battle-unit-panel-class">{t[selectedClass.nameKey]}</span>
              </div>
              <div className="battle-unit-panel-stat">
                HP {selectedUnit.hp}/{selectedUnit.maxHp}
              </div>
              <div className="battle-unit-panel-stat">
                AP{' '}
                {selectedUnit.side === 'ally' ? availableAp(state, selectedUnit) : selectedUnit.ap}/
                {selectedClass.apPerTurn}
              </div>
              {state.phase === 'player' && selectedUnit.side === 'ally' && (
                <div className="battle-unit-panel-actions">
                  <button
                    className={`battle-button${action === 'attack' ? ' is-active' : ''}`}
                    disabled={!canAttack}
                    onClick={() => setAction(action === 'attack' ? 'move' : 'attack')}
                  >
                    {t.attack}
                  </button>
                  {selectedUnit.skill && (
                    <button
                      className={`battle-button${action === 'skill' ? ' is-active' : ''}`}
                      disabled={!canSkill}
                      onClick={handleSkillButton}
                    >
                      {t[selectedUnit.skill.nameKey]}
                    </button>
                  )}
                  <button className="battle-button" onClick={deselect}>
                    {t.cancel}
                  </button>
                </div>
              )}
            </div>
          )}

        {/* 味方ターンの操作 */}
        {state.phase === 'player' && (
          <div className="battle-turn-buttons">
            <button className="battle-button" onClick={handleUndoTurn}>
              {t.undoTurn}
            </button>
            <button className="battle-button battle-end-turn-button" onClick={handleEndTurn}>
              {t.endTurn}
            </button>
          </div>
        )}

        {/* 勝敗 */}
        {(state.phase === 'victory' || state.phase === 'defeat') && (
          <div className="battle-result">
            <div className={`battle-result-title ${state.phase}`}>
              {state.phase === 'victory' ? t.victory : t.defeat}
            </div>
            <Link className="battle-result-button" to={paths.story}>
              {t.backToMap}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
