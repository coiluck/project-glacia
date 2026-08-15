import { useCharacterStore } from '../../../stores/characterStore'

const FORMATIONS = [1, 2, 3, 4]

// 編成1〜4の切替タブ。選択中の編成は characterStore が持つ
export default function FormationTabs() {
  const selected = useCharacterStore((s) => s.currentPartySlotIndex)
  const setSelected = useCharacterStore((s) => s.setCurrentPartySlotIndex)

  return (
    <div className="party-formation-tabs-container">
      {FORMATIONS.map((n) => (
        <button
          key={n}
          type="button"
          className={`party-formation-tab${n === selected ? ' selected' : ''}`}
          onClick={() => setSelected(n)}
        >
          <span className="party-formation-tab-label">編成{n}</span>
        </button>
      ))}
    </div>
  )
}
