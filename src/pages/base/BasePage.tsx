import { useMemo, useRef, useState } from 'react'
import Screen from '../../layouts/Screen'
import { useTranslations } from '../../i18n'
import { useBackHandler } from '../../hooks/useBackHandler'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { operateBase } from '../../api/actions/base'
import type { BasePayload } from '../../api/types'
import { characterMasters } from '../../data/characters'
import type { MaterialCost } from '../../data/characters/types'
import { items } from '../../data/items'
import { unitClasses } from '../../data/unitClasses'
import { analyzeBase, keyToAxial } from '../../features/base/board'
import { useBaseStore } from '../../stores/baseStore'
import { useCharacterStore } from '../../stores/characterStore'
import { useInventoryStore } from '../../stores/inventoryStore'
import { useProgressStore } from '../../stores/progressStore'
import { useRankStore } from '../../stores/rankStore'
import { useResourceStore } from '../../stores/resourceStore'
import { useStaminaStore } from '../../stores/staminaStore'
import BaseBoard from './components/BaseBoard'
import BaseSnow from './components/BaseSnow'
import BaseStatus from './components/BaseStatus'
import BaseToast from './components/BaseToast'
import CollectButton from './components/CollectButton'
import MemberGhost from './components/MemberGhost'
import MemberMini from './components/MemberMini'
import MemberPanel from './components/MemberPanel'
import TilePanel from './components/TilePanel'
import { useMemberDrag } from './useMemberDrag'
import { boardMembers, canStand, forecastAt, memberAt, rangeKeysOf, stocksOf } from './view'
import type { BaseView } from './view'

const BASE_TRANSLATION_MAPPING = Object.fromEntries(
  [
    'heat',
    'tower',
    'refinery',
    'pipe',
    'mine',
    'library',
    'storage',
    'ice',
    'resource',
    'grade',
    'close',
    'stockEmpty',
    'noProducer',
    'collect',
    'collected',
    'refined',
    'reasonCurrency',
    'reasonNotConnected',
    'mineOnly',
    'storageLimit',
    'stateActive',
    'stateIdle',
    'heatUse',
    'worker',
    'none',
    'hours',
    'full',
    'storageHours',
    'output',
    'unlockAt',
    'upgrade',
    'maxLevel',
    'remove',
    'towerHeat',
    'condChapter',
    'condRank',
    'memberStrip',
    'placed',
    'unplace',
    'hoursChange',
    'startsWorking',
    'operation',
    'effect',
    'whyIdle',
    'whyCold',
    'whyCut',
    'storeTime',
    'fullAfter',
    'perHourLabel',
    'pieceUnit',
    'warmTiles',
    'backTo',
    'build',
    'heatShort',
    'storageEffect',
    'ownedLabel',
    'prev',
    'next',
    'refineAll',
    'refineM2',
    'refineM3',
    'refineBook',
    'refineDo',
    'quantity',
    'condFor',
    'progressCount',
    'achieved',
    'notAchieved',
  ].map((k) => [k, k]),
)
const ITEM_TRANSLATION_MAPPING = Object.fromEntries(Object.values(items).map((i) => [i.id, i.nameKey]))
const NAME_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).map((c) => [c.id, c.nameKey]),
)
const CLASS_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(unitClasses).map((c) => [c.id, c.nameKey]),
)

const NO_RANGE = new Set<string>()

// 基地画面（凍土の開拓）。盤面を押して建てる・強化する・キャラを立たせる
export default function BasePage() {
  const t = useTranslations('base', BASE_TRANSLATION_MAPPING)
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)
  const tName = useTranslations('characters', NAME_TRANSLATION_MAPPING)
  const tClass = useTranslations('battle', CLASS_TRANSLATION_MAPPING)

  const base = useBaseStore((s) => s.base)
  const owned = useCharacterStore((s) => s.owned)
  const currency = useResourceStore((s) => s.currency)
  const inventory = useInventoryStore((s) => s.items)
  const rank = useRankStore((s) => s.rank)
  const clearedStageIds = useProgressStore((s) => s.clearedStageIds)
  const now = useStaminaStore((s) => s.now)

  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  // 右の欄に出すマス。閉じても残し、欄が引っ込む間も中身を見せる
  const [panelKey, setPanelKey] = useState<string | null>(null)
  const [membersOpen, setMembersOpen] = useState(false) // 基地のキャラの一覧
  const [memberId, setMemberId] = useState<string | null>(null) // 一覧で選んでいるキャラ
  const [pending, setPending] = useState(false) // 応答待ち
  const [toast, setToast] = useState<{ id: number; label: string; gains: MaterialCost[] } | null>(null)

  const characters = useMemo(() => Object.values(owned), [owned])
  const analysis = useMemo(() => analyzeBase(base, characters), [base, characters])
  const members = useMemo(() => boardMembers(base, analysis), [base, analysis])
  const stocks = stocksOf(analysis, Math.max(0, now - base.base_collected_at) / 3600)

  const select = (key: string | null) => {
    const next = key === selectedKey ? null : key
    setSelectedKey(next)
    if (next) setPanelKey(next)
  }

  const run = async (payload: BasePayload) => {
    if (pending) return
    setPending(true)
    const before = useInventoryStore.getState().items
    try {
      await operateBase(payload)
      if (payload.kind === 'collect' || payload.kind === 'refine') {
        const gains = Object.entries(useInventoryStore.getState().items)
          .filter(([id, n]) => n > (before[id] ?? 0))
          .map(([itemId, n]) => ({ itemId, count: n - (before[itemId] ?? 0) }))
        setToast({ id: Date.now(), label: payload.kind === 'collect' ? t.collected : t.refined, gains })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setPending(false)
    }
  }

  const view: BaseView = {
    base,
    analysis,
    characters,
    currency,
    inventory,
    rank,
    clearedStageIds,
    t,
    tItem,
    tName,
    tClass,
    pending,
    run,
  }

  // キャラを持ち上げてマスに置く。今のマスに戻したときは何もしない
  const { drag, ghostRef, handlers, cancel: cancelDrag } = useMemberDrag(
    (id, key) => canStand(view, id, key),
    (id, key) => {
      setMemberId(id)
      if (base.base_members[id] !== key) run({ kind: 'place', characterId: id, pos: keyToAxial(key) })
    },
  )

  // 無関係の所を押したら閉じる。盤面のマスやキャラ、一覧の札を押したときは、そちらで選び直す
  const sideRef = useRef<HTMLElement>(null)
  const membersRef = useRef<HTMLDivElement>(null)
  const inMembers = (target: Element) => membersRef.current?.contains(target) ?? false
  const closeMembers = () => {
    setMembersOpen(false)
    setMemberId(null)
    cancelDrag()
  }
  // 開くときはマスの詳細を閉じる。盤面を右へ寄せるので、左へ寄せる詳細とは並べない
  const openMembers = () => {
    select(null)
    setMembersOpen(true)
  }
  // 盤面のちび絵は一覧を開いている間はキャラを選ぶので、押しても閉じない
  useOutsideClick(membersOpen, (target) => inMembers(target) || target.closest('.base-member') !== null, closeMembers)
  useOutsideClick(
    selectedKey !== null,
    (target) =>
      (sideRef.current?.contains(target) ?? false) || inMembers(target) || target.closest('[data-selectable]') !== null,
    () => select(null),
  )

  // 戻る
  useBackHandler(() => {
    if (selectedKey) {
      setSelectedKey(null)
      return true
    }
    if (membersOpen) {
      closeMembers()
      return true
    }
    return false
  })

  // 作業範囲を出すキャラとマス。持ち上げている間は置こうとしているマス、一覧で選んでいればそのキャラの今のマス
  let rangeId: string | undefined
  let rangeKey: string | null = null
  if (drag) {
    rangeId = drag.id
    rangeKey = drag.target
  } else if (membersOpen && memberId) {
    rangeId = memberId
    rangeKey = base.base_members[memberId] ?? null
  } else if (selectedKey) {
    rangeId = memberAt(base, selectedKey)
    rangeKey = selectedKey
  }
  const rangeKeys = rangeKey && rangeId ? rangeKeysOf(rangeKey, rangeId) : NO_RANGE

  // 吸着中のマスに立たせたときに変わる建物
  const forecast = drag?.target
    ? { buildings: forecastAt(view, drag.id, drag.target), hoursLabel: t.hoursChange, wakesLabel: t.startsWorking }
    : null

  return (
    <>
      <div className={`page page-base${selectedKey ? ' is-open' : ''}${membersOpen ? ' is-members' : ''}`}>
        <BaseStatus view={view} />

        <div className="base-board-area">
          <BaseBoard
            base={base}
            analysis={analysis}
            stocks={stocks}
            members={members}
            selectedKey={rangeKey ?? selectedKey}
            rangeKeys={rangeKeys}
            onSelect={select}
            memberDrag={
              membersOpen
                ? { grab: (id) => handlers(id, !pending), heldId: drag?.id ?? null, onPick: setMemberId }
                : undefined
            }
            forecast={forecast}
          />
        </div>

        <BaseSnow />

        <div ref={membersRef} className="base-members-wrap">
          <MemberMini view={view} members={members} open={membersOpen} onOpen={openMembers} />
          {membersOpen && (
            <MemberPanel
              view={view}
              selectedId={memberId}
              heldId={drag?.id ?? null}
              onSelect={(id) => setMemberId(id === memberId ? null : id)}
              grab={handlers}
            />
          )}
        </div>

        <CollectButton view={view} stocks={stocks} onCollect={() => run({ kind: 'collect' })} />

        {/* マスを選んだときだけ右から出る */}
        <aside ref={sideRef} className="base-side">
          {panelKey && (
            <TilePanel
              key={panelKey}
              view={view}
              tileKey={panelKey}
              stock={stocks.get(panelKey)}
              onClose={() => select(null)}
            />
          )}
        </aside>

        {toast && (
          <BaseToast key={toast.id} label={toast.label} gains={toast.gains} onDone={() => setToast(null)} />
        )}
      </div>

      <MemberGhost drag={drag} ghostRef={ghostRef} />

      {/* 背景は戦闘と同じ */}
      <Screen viewport={<div className="battle-hud-background" />} />
    </>
  )
}
