import { useState } from 'react'
import { items } from '../../../data/items'
import type { ItemDef } from '../../../data/items'
import ItemIcon from '../../../components/common/ItemIcon'
import { EMBLEMS } from './art'
import { DetailCard, GoldButton, HoloArt, Stage } from './detail'
import type { BaseView } from '../view'

type Category = 'all' | 'm2' | 'm3' | 'book'
const CATEGORIES: Category[] = ['all', 'm2', 'm3', 'book']

// 合成できる物（recipe を持つアイテム）
const RECIPES = Object.values(items).filter((i) => i.recipe)
const categoryOf = (item: ItemDef): Category => (item.kind === 'book' ? 'book' : item.rarity === 2 ? 'm2' : 'm3')
const inCategory = (category: Category) => RECIPES.filter((i) => category === 'all' || categoryOf(i) === category)

type Props = {
  view: BaseView
  onClose: () => void
}

// 精錬所。作る物を1枚ずつめくり、素材から完成品への図と個数を出す
export default function RefineryPanel({ view, onClose }: Props) {
  const { t, tItem, inventory, pending, run } = view
  const [category, setCategory] = useState<Category>('all')
  const [picked, setPicked] = useState<string | null>(null)
  const [qty, setQty] = useState(1)

  const have = (id: string) => inventory[id] ?? 0
  const maxOf = (item: ItemDef) => Math.min(...item.recipe!.map((c) => Math.floor(have(c.itemId) / c.count)))
  const list = inCategory(category)
  // 選んでいなければ、作れる物の先頭
  const item = list.find((i) => i.id === picked) ?? list.find((i) => maxOf(i) > 0) ?? list[0]
  const index = list.indexOf(item)
  const max = maxOf(item)
  const count = Math.min(Math.max(1, qty), Math.max(1, max))

  const pick = (id: string) => {
    setPicked(id)
    setQty(1)
  }
  const step = (d: number) => pick(list[(index + d + list.length) % list.length].id)
  const changeCategory = (next: Category) => {
    setCategory(next)
    setPicked(null)
    setQty(1)
  }

  const labels: Record<Category, string> = { all: t.refineAll, m2: t.refineM2, m3: t.refineM3, book: t.refineBook }
  const single = list.length < 2

  return (
    <DetailCard
      emblem={EMBLEMS.refinery}
      title={t.refinery}
      closeLabel={t.close}
      onClose={onClose}
      foot={
        <GoldButton
          label={t.refineDo}
          disabled={max < 1}
          pending={pending}
          onClick={() => run({ kind: 'refine', itemId: item.id, count })}
        />
      }
    >
      <Stage low>
        <HoloArt kind="refinery" idle={false} className="bp-holo" />
      </Stage>

      {/* 分類。数字はその分類で今作れるレシピの数 */}
      <div className="bp-tabs">
        {CATEGORIES.map((c) => {
          const can = inCategory(c).filter((i) => maxOf(i) > 0).length
          return (
            <button key={c} type="button" className={c === category ? 'is-on' : ''} onClick={() => changeCategory(c)}>
              {labels[c]}
              {can > 0 && <small>{can}</small>}
            </button>
          )
        })}
      </div>

      <div className="bp-car">
        <button type="button" className="bp-arrow is-prev" aria-label={t.prev} disabled={single} onClick={() => step(-1)} />
        <div key={item.id} className={`bp-car-card is-rarity-${item.rarity}`}>
          <span className="bp-car-icon">
            <span>
              <ItemIcon item={item} className="base-item-icon" />
            </span>
          </span>
          <span className="bp-car-text">
            <b>{tItem[item.id]}</b>
            <span>
              {t.ownedLabel} <em>{have(item.id)}</em>
            </span>
          </span>
        </div>
        <button type="button" className="bp-arrow is-next" aria-label={t.next} disabled={single} onClick={() => step(1)} />
      </div>
      <div className="bp-dots">
        {list.map((i) => (
          <button
            key={i.id}
            type="button"
            className={`${i.id === item.id ? 'is-on' : ''}${maxOf(i) < 1 ? ' is-dim' : ''}`}
            aria-label={tItem[i.id]}
            onClick={() => pick(i.id)}
          >
            <ItemIcon item={i} className="base-item-icon" />
          </button>
        ))}
      </div>

      {/* 素材 → 完成品 */}
      <div className="bp-flow">
        <div className="bp-flow-ins">
          {item.recipe!.map((c) => {
            const need = c.count * count
            return (
              <div key={c.itemId} className={`bp-flow-in is-rarity-${items[c.itemId].rarity}${have(c.itemId) < need ? ' is-short' : ''}`}>
                <span className="bp-flow-icon">
                  <ItemIcon item={items[c.itemId]} className="base-item-icon" />
                </span>
                <b>{tItem[c.itemId]}</b>
                <span>
                  <em>{have(c.itemId)}</em> / {need}
                </span>
              </div>
            )
          })}
        </div>
        <i className="bp-flow-arrow" />
        <div className={`bp-flow-out is-rarity-${item.rarity}`}>
          <span className="bp-flow-icon">
            <ItemIcon item={item} className="base-item-icon" />
          </span>
          <b>{tItem[item.id]}</b>
          <span>＋{count}</span>
        </div>
      </div>

      {max > 0 && (
        <div className="bp-qty">
          <span>{t.quantity}</span>
          <button type="button" aria-label="-1" disabled={count <= 1} onClick={() => setQty(count - 1)}>
            −
          </button>
          <b>
            {count}
            <i>/ {max}</i>
          </b>
          <button type="button" aria-label="+1" disabled={count >= max} onClick={() => setQty(count + 1)}>
            ＋
          </button>
        </div>
      )}
    </DetailCard>
  )
}
