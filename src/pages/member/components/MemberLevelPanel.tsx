import { useState } from 'react'
import MaterialCostList from './MaterialCostList'
import { enhanceCharacter } from '../../../api/actions/characters'
import { hasItems } from '../../../features/inventory/inventory'
import type { ResolvedCharacter } from '../../../features/characters/resolve'
import { useInventoryStore } from '../../../stores/inventoryStore'

// レベルアップと上限解放。壁に当たったらそのまま解放できるよう同じパネルに置く
export default function MemberLevelPanel({ character }: { character: ResolvedCharacter }) {
  const { master, user } = character
  const items = useInventoryStore((s) => s.items)
  const [pending, setPending] = useState(false) // 応答待ち。二重に押させない
  const [error, setError] = useState<string | null>(null)

  const cost = character.nextLimitBreakCost
  const canRelease = character.canLimitBreak && cost !== null && hasItems(items, cost)

  const release = async () => {
    if (pending || !canRelease) return
    setPending(true)
    setError(null)
    try {
      await enhanceCharacter({ kind: 'limitBreak', masterId: master.id })
    } catch (e) {
      setError(e instanceof Error ? e.message : '失敗した')
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <section className="member-detail-levelup">
        <h2 className="member-detail-section-title">レベルアップ</h2>
        {/* TODO: 育成記録の個数選択UIを作ってから有効化する（実装計画 工程5） */}
        <button type="button" className="member-detail-levelup-button" disabled>
          レベルアップ
        </button>
      </section>

      <section className="member-detail-limit-break">
        <h2 className="member-detail-section-title">
          上限解放 {user.limitBreak} / {master.limitBreakCosts.length}
        </h2>
        <span className="member-detail-limit-break-state">
          {cost === null
            ? '解放済み'
            : character.canLimitBreak
              ? '解放できる'
              : `Lv.${character.maxLevel} で解放できる`}
        </span>
        <button
          type="button"
          className="member-detail-limit-break-button"
          disabled={pending || !canRelease}
          onClick={release}
        >
          解放する
        </button>
        <MaterialCostList costs={cost} />
        {error && <span className="member-detail-enhance-error">{error}</span>}
      </section>
    </>
  )
}
