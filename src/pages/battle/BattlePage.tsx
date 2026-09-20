import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { paths } from '../../router/paths'
import { useTranslations } from '../../i18n'
import { battleStageRegistry } from '../../data/battleStages'
import { characterMasters } from '../../data/characters'
import { enemyDefs } from '../../data/enemies'
import { unitClasses } from '../../data/unitClasses'
import { buildParty } from '../../features/characters/build'
import { useCharacterStore } from '../../stores/characterStore'
import {
  aimableTilesOnBoard,
  availableAp,
  movementRange,
  skillHitsAnyone,
  skillHitsByEffect,
  unitById,
} from '../../features/battle/battle'
import { useBattleStore } from '../../features/battle/battleStore'
import { calcDamage } from '../../features/battle/damage'
import { axialKey, effectTiles, shapeAimsAnyDirection, shapeTiles } from '../../features/battle/hex'
import type { AimTile, Axial } from '../../features/battle/hex'
import type { Unit } from '../../features/battle/types'
import ActionDock from './components/ActionDock'
import BattleHud from './components/BattleHud'
import BattleResult from './components/BattleResult'
import DeployDock from './components/DeployDock'
import HexGrid from './components/HexGrid'
import PhaseBanner from './components/PhaseBanner'
import UnitPanel from './components/UnitPanel'
import ViewportLayer from '../../layouts/ViewportLayer'

// i18n。キャラ名とスキル名は characters.json、それ以外は battle.json にある
const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  [
    ...Object.values(characterMasters).map((c) => c.nameKey),
    ...Object.values(characterMasters).flatMap((c) => c.skills.map((s) => s.def.nameKey)),
  ].map((k) => [k, k]),
)

const BATTLE_TRANSLATION_MAPPING = Object.fromEntries(
  [
    ...Object.values(unitClasses).map((c) => c.nameKey),
    ...Object.values(enemyDefs).map((e) => e.nameKey),
    ...Object.values(enemyDefs).flatMap((e) => (e.skill ? [e.skill.def.nameKey] : [])),
    'deployHint',
    'deployed',
    'startBattle',
    'endTurn',
    'undoTurn',
    'attack',
    'deselect',
    'normalAttack',
    'power',
    'skillTriggerHp',
    'skillTriggerTurns',
    'backToMap',
    'emptyParty',
  ].map((k) => [k, k]),
)

// 選択中ユニットに対して指示できる行動
export type ActionMode = 'move' | 'attack' | 'skill'

// 盤面タイルのハイライト種別
export type HighlightKind = 'deploy' | 'move' | 'attack' | 'skill' | 'area' | 'area-miss' | 'threat'

// タイルの上に重ねる印
export type MarkKind = 'selected' | 'selected-enemy' | 'target' | 'aim'

// 行動の予告値
export interface UnitChip {
  kind: 'damage' | 'heal' | 'ap'
  value: number
  lethal?: boolean // このダメージで倒せる
}

// i18n の {0} {1} … を埋める
const fill = (template: string, ...values: (string | number)[]) =>
  template.replace(/\{(\d+)\}/g, (match, index: string) => String(values[Number(index)] ?? match))

export default function BattlePage() {
  const { stageId } = useParams<{ stageId: string }>()
  return <BattleScreen key={stageId} stageId={stageId} />
}

function BattleScreen({ stageId }: { stageId: string | undefined }) {
  const tBattle = useTranslations('battle', BATTLE_TRANSLATION_MAPPING)
  const tCharacter = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)
  const t = { ...tBattle, ...tCharacter }
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null)
  const [action, setAction] = useState<ActionMode>('move')
  const [hoverKey, setHoverKey] = useState<string | null>(null)
  const [hoverButton, setHoverButton] = useState<'attack' | 'skill' | null>(null)
  const [previewKey, setPreviewKey] = useState<string | null>(null)
  const [twoTap] = useState(() => window.matchMedia('(hover: none)').matches)

  // 編成中のパーティをマスターデータ＋所持データから組み立てる。
  // 戦闘中は変わらないので、この戦闘のあいだ固定する
  const [party] = useState(() => {
    const s = useCharacterStore.getState()
    return buildParty(s.owned, s.party[s.currentPartySlotIndex] ?? [])
  })
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
        <div className="battle-notice">
          <div className="battle-notice-title">STAGE {stageId} — NO DATA</div>
          <Link className="battle-notice-button" to={paths.story} replace>
            {t.backToMap}
          </Link>
        </div>
      </div>
    )
  }

  // 編成が空（ハイドレート前に入った・全員未所持など）だと1体も配置できず、
  // 開始ボタンも押せない詰み画面になるので、マップへ戻れるようにする
  if (party.length === 0) {
    return (
      <div className="page-battle">
        <div className="battle-notice">
          <div className="battle-notice-title">{t.emptyParty}</div>
          <Link className="battle-notice-button" to={paths.story} replace>
            {t.backToMap}
          </Link>
        </div>
      </div>
    )
  }

  const classes = unitClasses
  const selectedUnit = state.units.find((u) => u.id === selectedUnitId) ?? null
  const selectedClass = selectedUnit ? classes[selectedUnit.classId] : null

  // createBattleState / deployAlly の `enemy-{i}-{defId}` / `ally-{charId}` という命名規則に依存
  const unitNameKey = (unit: Unit): string => {
    if (unit.side === 'ally')
      return characterMasters[unit.id.slice('ally-'.length)]?.nameKey ?? unit.id
    return enemyDefs[unit.id.split('-').slice(2).join('-')]?.nameKey ?? unit.id
  }
  const getUnitName = (unit: Unit) => t[unitNameKey(unit)] ?? ''

  // 味方は配置フェーズと同じちび絵を盤面に立てる。敵は絵がないので null（トークン表示）
  const getUnitChibi = (unit: Unit): string | null =>
    unit.side === 'ally'
      ? `${import.meta.env.BASE_URL}images/character/chibi/${unit.id.slice('ally-'.length)}.png`
      : null

  const isDeployed = (charId: string) => state.units.some((u) => u.id === `ally-${charId}`)

  // タイルのハイライトを算出
  const tileSet = new Set(stage.tiles.map((tile) => axialKey(tile.pos)))
  const highlights = new Map<string, HighlightKind>()
  // スキルで狙えるマス。撃つときに効果の向きが要るので AimTile ごと持っておく
  const skillAims = new Map<string, AimTile>()
  const moveCosts = new Map<string, number>()
  if (state.phase === 'deployment') {
    const occupied = new Set(state.units.map((u) => axialKey(u.pos)))
    if (party.some((m) => !isDeployed(m.character.id))) {
      for (const pos of stage.deployableTiles) {
        if (!occupied.has(axialKey(pos))) highlights.set(axialKey(pos), 'deploy')
      }
    }
  } else if (state.phase === 'player' && selectedUnit?.side === 'ally') {
    if (action === 'move') {
      for (const { pos, cost } of movementRange(state, stage, selectedUnit)) {
        highlights.set(axialKey(pos), 'move')
        moveCosts.set(axialKey(pos), cost)
      }
    } else if (action === 'attack') {
      for (const pos of shapeTiles(selectedUnit.pos, classes[selectedUnit.classId].attackRange)) {
        if (tileSet.has(axialKey(pos))) highlights.set(axialKey(pos), 'attack')
      }
    } else if (action === 'skill' && selectedUnit.skill) {
      for (const aim of aimableTilesOnBoard(stage, selectedUnit.pos, selectedUnit.skill)) {
        const key = axialKey(aim.pos)
        skillAims.set(key, aim)
        highlights.set(key, 'skill')
      }
    }
  }
  if (selectedUnit?.side === 'enemy' && selectedClass) {
    for (const aim of shapeAimsAnyDirection(selectedUnit.pos, selectedClass.attackRange)) {
      const key = axialKey(aim.pos)
      if (tileSet.has(key) && !highlights.has(key)) highlights.set(key, 'threat')
    }
  }

  const focusKey = hoverKey ?? previewKey
  const marks = new Map<string, MarkKind>()
  const chips = new Map<string, UnitChip>()
  let previewCost = 0
  if (selectedUnit) {
    marks.set(axialKey(selectedUnit.pos), selectedUnit.side === 'ally' ? 'selected' : 'selected-enemy')
  }
  if (state.phase === 'player' && selectedUnit?.side === 'ally' && selectedClass) {
    const skill = selectedUnit.skill
    if (hoverButton === 'attack') previewCost = selectedClass.attackCost
    else if (hoverButton === 'skill' && skill) previewCost = skill.apCost
    else if (action === 'move') previewCost = focusKey ? (moveCosts.get(focusKey) ?? 0) : 0
    else if (action === 'attack') previewCost = selectedClass.attackCost
    else if (action === 'skill' && skill) previewCost = skill.apCost

    if (action === 'attack' && focusKey && highlights.get(focusKey) === 'attack') {
      const target = state.units.find((u) => axialKey(u.pos) === focusKey)
      if (target?.side === 'enemy') {
        const damage = calcDamage(selectedUnit, target, selectedClass.attackPower)
        chips.set(target.id, { kind: 'damage', value: damage, lethal: damage >= target.hp })
      }
    }
    const aim = action === 'skill' && focusKey ? skillAims.get(focusKey) : undefined
    if (skill && aim) {
      const hits = skillHitsByEffect(state, selectedUnit, skill, aim)
      const anyone = hits.some((h) => h.unitIds.length > 0)
      for (const effect of skill.effect) {
        for (const pos of effectTiles(aim.pos, effect.area, aim.direction)) {
          const key = axialKey(pos)
          if (tileSet.has(key)) highlights.set(key, anyone ? 'area' : 'area-miss')
        }
      }
      for (const { effect, unitIds } of hits) {
        for (const id of unitIds) {
          const target = unitById(state, id)
          switch (effect.type) {
            case 'damage': {
              const damage = calcDamage(selectedUnit, target, effect.power)
              chips.set(id, { kind: 'damage', value: damage, lethal: damage >= target.hp })
              break
            }
            case 'healHp':
              chips.set(id, { kind: 'heal', value: Math.min(effect.amount, target.maxHp - target.hp) })
              break
            case 'grantAp':
              chips.set(id, { kind: 'ap', value: effect.amount })
              break
          }
        }
      }
      marks.set(axialKey(aim.pos), 'aim')
    }
    // 当たる相手の印は狙っているマスの印より優先
    for (const id of chips.keys()) marks.set(axialKey(unitById(state, id).pos), 'target')
  }

  // このターンもう動けない味方
  const actedIds = new Set(
    state.phase === 'player'
      ? state.units.filter((u) => u.side === 'ally' && availableAp(state, u) === 0).map((u) => u.id)
      : [],
  )

  const deselect = () => {
    setSelectedUnitId(null)
    setAction('move')
    setPreviewKey(null)
    setHoverButton(null)
  }

  // 行動を終えて移動モードへ
  const finishAction = () => {
    setAction('move')
    setPreviewKey(null)
    setHoverButton(null)
  }

  const confirmOrPreview = (key: string): boolean => {
    if (twoTap && previewKey !== key) {
      setPreviewKey(key)
      return false
    }
    return true
  }

  // 狙ったマスへスキルを撃つ。誰にも当たらないならAPを捨てないよう撃たずに false を返す
  const castSkillAt = (user: Unit, pos: Axial): boolean => {
    const key = axialKey(pos)
    const aim = skillAims.get(key)
    if (!user.skill || !aim) return false
    if (!skillHitsAnyone(state, user, user.skill, aim)) return false
    if (!confirmOrPreview(key)) return true // 予告を出しただけ。モードは維持
    doSkill(user.id, pos)
    finishAction()
    return true
  }

  // 配置フェーズの配置は DeployDock のドラッグが担当する
  const handleTileClick = (pos: Axial) => {
    if (state.phase !== 'player') return
    const key = axialKey(pos)
    if (selectedUnit?.side === 'ally' && action === 'move' && moveCosts.has(key)) {
      if (!confirmOrPreview(key)) return
      move(selectedUnit.id, pos)
      setPreviewKey(null)
      return
    }
    // 範囲攻撃は誰も立っていないマスを狙点にすることもある
    if (selectedUnit?.side === 'ally' && action === 'skill' && skillAims.has(key)) {
      castSkillAt(selectedUnit, pos)
      return
    }
    deselect() // 関係ないタイル -> 選択解除
  }

  const handleUnitClick = (unit: Unit) => {
    if (state.phase === 'deployment') {
      if (unit.side === 'ally') {
        // 配置済みの味方をタップで配置解除し、ドックへ戻す
        undeploy(unit.id)
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
        if (!confirmOrPreview(key)) return
        doAttack(selectedUnit.id, [unit.id])
        finishAction()
        return
      }
      // 効果の当たり判定が対象の適否を兼ねるので、陣営の判定はここでは要らない
      if (action === 'skill' && castSkillAt(selectedUnit, unit.pos)) return
    }
    // 選択の切り替えのみ
    setSelectedUnitId(unit.id)
    setAction('move')
    setPreviewKey(null)
  }

  const handleAttackButton = () => {
    setAction(action === 'attack' ? 'move' : 'attack')
    setPreviewKey(null)
  }

  const handleSkillButton = () => {
    if (!selectedUnit?.skill) return
    // 選ぶ余地が無い（＝自分のマスしか狙えない）スキルは選ばせずそのまま撃つ。
    // 自分のマスは常に狙えるので、候補が1つならそれは自分のマス
    const aims = aimableTilesOnBoard(stage, selectedUnit.pos, selectedUnit.skill)
    if (aims.length === 1) {
      doSkill(selectedUnit.id, aims[0].pos)
      finishAction()
    } else {
      setAction(action === 'skill' ? 'move' : 'skill')
      setPreviewKey(null)
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

  const canAttack =
    selectedUnit && selectedClass
      ? availableAp(state, selectedUnit) >= selectedClass.attackCost
      : false
  const canSkill =
    selectedUnit?.skill != null && availableAp(state, selectedUnit) >= selectedUnit.skill.apCost

  // 敵の補足（通常攻撃の威力と消費AP、スキルの発動条件）
  const enemyNotes = (unit: Unit): string[] => {
    const cls = classes[unit.classId]
    const range =
      cls.attackRange.kind === 'range' ? ` · RANGE ${cls.attackRange.min ?? 1}–${cls.attackRange.max}` : ''
    const notes = [`${t.normalAttack} ${t.power} ${cls.attackPower} · ${cls.attackCost} AP${range}`]
    if (unit.skill) {
      const trigger =
        unit.skillHpTriggers && unit.skillHpTriggers.length > 0
          ? fill(t.skillTriggerHp, Math.max(...unit.skillHpTriggers))
          : unit.skillEveryNTurns !== undefined
            ? fill(t.skillTriggerTurns, unit.skillEveryNTurns)
            : ''
      notes.push(`${t[unit.skill.nameKey]} ${trigger}`.trim())
    }
    return notes
  }

  const inBattle = state.phase !== 'victory' && state.phase !== 'defeat'

  return (
    <>
      <ViewportLayer>
        {/* 敵ターン中の画面 */}
        {state.phase === 'enemy' &&
          <div className="battle-hud-enemy-turn-overlay" />
        }

        {/* 背景 */}
        <div className="battle-hud-background" />
      </ViewportLayer>


      <div className="page-battle">
        {/* 盤面。リザルトの暗幕はセーフエリアの下（ビューポート層）にあり盤面を覆えないので、決着後は描かない */}
        {inBattle && (
          <div className="battle-board-area">
            <HexGrid
              tiles={stage.tiles}
              units={state.units}
              highlights={highlights}
              marks={marks}
              costs={moveCosts}
              chips={chips}
              hoverKey={focusKey}
              selectedUnitId={selectedUnitId}
              actedIds={actedIds}
              getUnitName={getUnitName}
              getUnitChibi={getUnitChibi}
              onTileClick={handleTileClick}
              onUnitClick={handleUnitClick}
              onHover={setHoverKey}
            />
          </div>
        )}

        {/* ターン・フェーズ・パーティAP */}
        {inBattle && (
          <BattleHud
            phase={state.phase}
            turn={state.turn}
            partyAp={state.partyAp}
            partyApMax={stage.partyApPerTurn}
            spend={previewCost}
          />
        )}

        {/* 配置フェーズ用 */}
        {state.phase === 'deployment' && (
          <DeployDock
            party={party}
            isDeployed={isDeployed}
            getName={(charId) => t[characterMasters[charId]?.nameKey ?? ''] ?? ''}
            hint={t.deployHint}
            deployedLabel={t.deployed}
            startLabel={t.startBattle}
            canStart={state.units.some((u) => u.side === 'ally')}
            onStart={start}
            onDeploy={(member, pos) => deploy(member.character, member.skill, pos)}
          />
        )}

        {/* 選択中ユニットの情報（配置中は敵の下見にも使う） */}
        {(state.phase === 'player' || state.phase === 'deployment') &&
          selectedUnit &&
          selectedClass && (
            <UnitPanel
              unit={selectedUnit}
              name={getUnitName(selectedUnit)}
              unitClass={selectedClass}
              className={t[selectedClass.nameKey]}
              ap={selectedUnit.side === 'ally' ? availableAp(state, selectedUnit) : selectedClass.apPerTurn}
              spend={selectedUnit.side === 'ally' ? previewCost : 0}
              notes={selectedUnit.side === 'enemy' ? enemyNotes(selectedUnit) : undefined}
            />
          )}

        {/* 味方の行動 */}
        {state.phase === 'player' && selectedUnit?.side === 'ally' && selectedClass && (
          <ActionDock
            unitClass={selectedClass}
            skill={selectedUnit.skill}
            skillName={selectedUnit.skill ? t[selectedUnit.skill.nameKey] : ''}
            attackLabel={t.attack}
            deselectLabel={t.deselect}
            action={action}
            canAttack={canAttack}
            canSkill={canSkill}
            onAttack={handleAttackButton}
            onSkill={handleSkillButton}
            onDeselect={deselect}
            onHover={setHoverButton}
          />
        )}

        {/* 味方ターンの操作 */}
        {state.phase === 'player' && (
          <div className="battle-turn-controls">
            <button className="battle-button-ghost" onClick={handleUndoTurn}>
              {t.undoTurn}
            </button>
            <button className="battle-button-primary" onClick={handleEndTurn}>
              {t.endTurn}
            </button>
          </div>
        )}

        {/* フェーズの切り替わり */}
        {(state.phase === 'player' || state.phase === 'enemy') && (
          <PhaseBanner key={`${state.phase}-${state.turn}`} phase={state.phase} turn={state.turn} />
        )}

        {/* 勝敗。結果の送信と報酬の表示は BattleResult が持つ */}
        {stageId && (state.phase === 'victory' || state.phase === 'defeat') && (
          <BattleResult stageId={stageId} result={state.phase} />
        )}
      </div>
    </>
  )
}
