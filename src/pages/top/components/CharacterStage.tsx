// 中央のキャラ立ち絵
export default function CharacterStage() {
  return (
    <div className="top-character">
      <div className="top-character-text-container">
        <p className="top-character-name">ココネ</p>
        <p className="top-character-line">さあ、出発だよ！</p>
      </div>
      <div className="top-character-art" aria-hidden>
        <img src="/project-glacia/images/top/a.png" alt="ココネ" />
      </div>
    </div>
  )
}
