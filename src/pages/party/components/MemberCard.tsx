// 編成スロット1枚分のカード（立ち絵 / Lv / HP / ATK / 属性など）。
// TODO: types.Character を受け取って表示する。
export default function MemberCard({ slotIndex }: { slotIndex: number }) {
  return (
    <div className="member-card">
      <span className="slot-no">{slotIndex + 1}</span>
      <div className="member-card__portrait" />
      <p>Lv.-- / HP-- / ATK--</p>
    </div>
  )
}
