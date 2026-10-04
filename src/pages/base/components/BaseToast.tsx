import type { MaterialCost } from '../../../data/characters/types'
import { items } from '../../../data/items'
import ItemIcon from '../../../components/common/ItemIcon'

type Props = {
  label: string
  gains: MaterialCost[]
  onDone: () => void
}

// 回収・合成で受け取った物。演出が終わったら消える
export default function BaseToast({ label, gains, onDone }: Props) {
  return (
    <div className="base-toast" onAnimationEnd={onDone}>
      {label}
      {gains.map((g) => (
        <span key={g.itemId} className="base-toast-item">
          <ItemIcon item={items[g.itemId]} className="base-item-icon" />
          <b>+{g.count}</b>
        </span>
      ))}
    </div>
  )
}
