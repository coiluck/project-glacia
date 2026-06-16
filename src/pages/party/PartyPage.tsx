import FormationTabs from './components/FormationTabs'
import MemberCard from './components/MemberCard'

// 編成画面。編成1〜4のタブ切替と、5体のメンバースロット。
export default function PartyPage() {
  const slots = [0, 1, 2, 3, 4]
  return (
    <div className="page page-party">
      <h1>編成 / PARTY</h1>
      <FormationTabs />
      <div className="party-slots">
        {slots.map((i) => (
          <MemberCard key={i} slotIndex={i} />
        ))}
      </div>
    </div>
  )
}
