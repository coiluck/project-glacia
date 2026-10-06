type Props = {
  name: string
  line: string
}

// 左の立ち絵とセリフ
export default function ExchangeStage({ name, line }: Props) {
  return (
    <div className="exchange-character">
      <img
        className="exchange-character-art"
        src={`${import.meta.env.BASE_URL}images/character/full_body/lapis.avif`}
        alt=""
      />
      <div className="exchange-line">
        <span className="exchange-line-name">{name}</span>
        <p key={line} className="exchange-line-text">
          {line}
        </p>
      </div>
    </div>
  )
}
