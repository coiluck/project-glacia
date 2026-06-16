// 全画面共通の上部リソースバー（スタミナ / 通貨 / ジェムなど）。
// TODO: stores のプレイヤー状態と接続する。
export default function ResourceBar() {
  return (
    <header className="resource-bar">
      <span>STAMINA --/--</span>
      <span>GOLD --</span>
      <span>GEM --</span>
    </header>
  )
}
