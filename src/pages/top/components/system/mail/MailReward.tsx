// メールの添付1つ。一覧に出す小さな札（MailChip）と、本文の横に並べる札（MailReward）
import BillIcon from '../../../../../components/common/BillIcon'
import GemIcon from '../../../../../components/common/GemIcon'
import ItemIcon from '../../../../../components/common/ItemIcon'
import { items } from '../../../../../data/items'
import { useTranslations } from '../../../../../i18n'
import type { MailReward as Reward } from '../../../../../features/mail/types'

const ITEM_MAPPING = Object.fromEntries(Object.values(items).map((i) => [i.nameKey, i.nameKey]))

function RewardIcon({ reward, className }: { reward: Reward; className: string }) {
  if (reward.kind === 'gems') return <GemIcon className={className} />
  if (reward.kind === 'currency') return <BillIcon className={className} />
  return <ItemIcon item={items[reward.itemId]} className={className} />
}

export function MailChip({ reward }: { reward: Reward }) {
  return (
    <span className="system-mail-chip">
      <RewardIcon reward={reward} className="system-mail-chip-icon" />
      <b>{reward.amount.toLocaleString()}</b>
    </span>
  )
}

export default function MailReward({ reward }: { reward: Reward }) {
  const common = useTranslations('common', { gems: 'gems', currency: 'currency' })
  const itemName = useTranslations('items', ITEM_MAPPING)
  const name = reward.kind === 'item' ? itemName[items[reward.itemId].nameKey] : common[reward.kind]

  return (
    <div className="system-mail-tile">
      <RewardIcon reward={reward} className="system-mail-tile-icon" />
      <span className="system-mail-tile-name">{name}</span>
      <b>×{reward.amount.toLocaleString()}</b>
    </div>
  )
}
