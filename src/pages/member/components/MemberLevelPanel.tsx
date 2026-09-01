import MaterialCostList from './MaterialCostList'
import type { ResolvedCharacter } from '../../../features/characters/resolve'

// レベルアップと上限解放。壁に当たったらそのまま解放できるよう同じパネルに置く
export default function MemberLevelPanel({ character }: { character: ResolvedCharacter }) {
  const { master, user } = character

  return (
    <>
      <section className="member-detail-levelup">
        <h2 className="member-detail-section-title">レベルアップ</h2>
        {/* TODO: inventoryStore ができたら有効化する（実装計画 工程5） */}
        <button type="button" className="member-detail-levelup-button" disabled>
          レベルアップ
        </button>
      </section>

      <section className="member-detail-limit-break">
        <h2 className="member-detail-section-title">
          上限解放 {user.limitBreak} / {master.limitBreakCosts.length}
        </h2>
        <span className="member-detail-limit-break-state">
          {character.nextLimitBreakCost === null
            ? '解放済み'
            : character.canLimitBreak
              ? '解放できる'
              : `Lv.${character.maxLevel} で解放できる`}
        </span>
        {/* TODO: inventoryStore ができたら有効化する（実装計画 工程5） */}
        <button type="button" className="member-detail-limit-break-button" disabled>
          解放する
        </button>
        <MaterialCostList costs={character.nextLimitBreakCost} />
      </section>
    </>
  )
}
