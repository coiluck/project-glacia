// メールの添付1つ。アイコンと個数の札
import BillIcon from '../../../../../components/common/BillIcon'
import GemIcon from '../../../../../components/common/GemIcon'
import ItemIcon from '../../../../../components/common/ItemIcon'
import { items } from '../../../../../data/items'
import type { MailReward as Reward } from '../../../../../features/mail/types'

export default function MailReward({ reward }: { reward: Reward }) {
  return (
    <div className="system-mail-reward">
      {reward.kind === 'gems' && <GemIcon className="system-mail-reward-icon" />}
      {reward.kind === 'currency' && <BillIcon className="system-mail-reward-icon" />}
      {reward.kind === 'item' && <ItemIcon item={items[reward.itemId]} className="system-mail-reward-icon" />}
      <b>{reward.amount.toLocaleString()}</b>
    </div>
  )
}
