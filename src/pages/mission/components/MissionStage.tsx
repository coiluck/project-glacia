type Props = {
  name: string
  line: string
}

// 左の立ち絵とセリフ
export default function MissionStage({ name, line }: Props) {
  return (
    <div className="mission-stage">
      <span className="mission-stage-mark">MISSION</span>
      <img
        className="mission-stage-art"
        src={`${import.meta.env.BASE_URL}images/character/full_body/lapis.avif`}
        alt=""
      />
      <div className="mission-line">
        <span className="mission-line-name">{name}</span>
        <p key={line} className="mission-line-text is-changed">
          {line}
        </p>
      </div>
    </div>
  )
}
