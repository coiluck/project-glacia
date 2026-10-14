import { dupeLabel, dupeSteps } from '../dupe'

interface RecruitExchangeProps {
  masterId: string
  title: string // どちらの召集の交換所か
  dupe: number | null
  nameOf: (masterId: string) => string
}

export default function RecruitExchange({ masterId, title, dupe, nameOf }: RecruitExchangeProps) {
  const name = nameOf(masterId)

  return (
    <>
      <img
        className={`recruit-art is-${masterId}`}
        src={`${import.meta.env.BASE_URL}images/character/full_body/${masterId}.avif`}
        alt=""
      />
      <div className="recruit-type">
        <p className="recruit-kicker">交換所・{title}</p>
        <h1 className={`recruit-name${name.length > 4 ? ' is-long' : ''}`}>{name}</h1>
        <p className="recruit-stars">
          ★★★<span>{dupeLabel(dupe)}</span>
        </p>
        <ol className="recruit-steps">
          {dupeSteps(masterId, dupe, name).map((s) => (
            <li key={s.step} className={`is-${s.state}`}>
              <span>{s.step}</span>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
