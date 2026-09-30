import GemIcon from '../../../components/common/GemIcon'

type Props = {
  label: string
  gems: number
  onDone: () => void
}

// 受け取ったときの表示。演出が終わったら消える
export default function MissionToast({ label, gems, onDone }: Props) {
  return (
    <div className="mission-toast" onAnimationEnd={onDone}>
      {label}
      <GemIcon className="" />
      <b>+{gems}</b>
    </div>
  )
}
