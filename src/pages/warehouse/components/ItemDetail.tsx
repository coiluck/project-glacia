import { Link } from 'react-router-dom'
import { paths } from '../../../router/paths'
import { items, type ItemDef, type ItemKind } from '../../../data/items'
import { RARITIES } from '../../../data/characters/const'
import { useTranslations } from '../../../i18n'
import { useProgressStore } from '../../../stores/progressStore'
import { chapterOf, dropSources } from '../dropSources'
import ItemIcon from '../../../components/common/ItemIcon'

const KIND_KEYS: Record<ItemKind, { label: string; desc: string }> = {
  material: { label: 'kindMaterial', desc: 'kindMaterialDesc' },
  book: { label: 'kindBook', desc: 'kindBookDesc' },
  exp: { label: 'kindExp', desc: 'kindExpDesc' },
}

const ITEM_TRANSLATION_MAPPING = Object.fromEntries([
  ...Object.values(items).map((i) => [i.nameKey, i.nameKey]),
  ...Object.values(KIND_KEYS).flatMap((k) => [
    [k.label, k.label],
    [k.desc, k.desc],
  ]),
])

const WAREHOUSE_TRANSLATION_MAPPING = {
  noItem: 'noItem',
  owned: 'owned',
  exp: 'exp',
  recipe: 'recipe',
  sources: 'sources',
  sourcesNote: 'sourcesNote',
  noDrop: 'noDrop',
  noDropRecipe: 'noDropRecipe',
}

type Props = {
  item: ItemDef | null // null は1つも持っていないとき
  owned: Record<string, number>
}

// 選択中アイテムの詳細
export default function ItemDetail({ item, owned }: Props) {
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)
  const t = useTranslations('warehouse', WAREHOUSE_TRANSLATION_MAPPING)
  const maxChapter = useProgressStore((s) => s.chapter)
  const setCurrentChapter = useProgressStore((s) => s.setCurrentChapter)

  if (!item) {
    return (
      <section className="warehouse-detail">
        <div className="warehouse-detail-body">
          <span className="warehouse-detail-caption">DETAIL</span>
          <p className="warehouse-detail-placeholder">{t.noItem}</p>
        </div>
      </section>
    )
  }

  const kind = KIND_KEYS[item.kind]
  const sources = dropSources[item.id] ?? []

  return (
    <section className={`warehouse-detail is-rarity-${item.rarity}`}>
      <div key={item.id} className="warehouse-detail-body">
        <span className="warehouse-detail-caption">DETAIL</span>

        <div className="warehouse-detail-head">
          <div className="warehouse-detail-frame">
            <ItemIcon item={item} />
          </div>
          <div className="warehouse-detail-title">
            <span className="warehouse-detail-kind">{tItem[kind.label]}</span>
            <span className="warehouse-detail-name">{tItem[item.nameKey]}</span>
            <span className="warehouse-detail-stars">
              {RARITIES.map((r) => (
                <span key={r} className={`warehouse-detail-star${r > item.rarity ? ' is-off' : ''}`}>
                  ★
                </span>
              ))}
            </span>
          </div>
        </div>

        <dl className="warehouse-detail-rows">
          <div className="warehouse-detail-row">
            <dt>{t.owned}</dt>
            <dd>{owned[item.id] ?? 0}</dd>
          </div>
          {item.kind === 'exp' && (
            <div className="warehouse-detail-row">
              <dt>{t.exp}</dt>
              <dd>
                +{item.exp}
                <small>EXP</small>
              </dd>
            </div>
          )}
        </dl>

        <p className="warehouse-detail-desc">{tItem[kind.desc]}</p>

        {item.recipe && (
          <div className="warehouse-detail-block">
            <h3 className="warehouse-detail-section-title">{t.recipe}</h3>
            <ul className="warehouse-recipe">
              {item.recipe.map((cost) => {
                const material = items[cost.itemId]
                const have = owned[cost.itemId] ?? 0
                return (
                  <li
                    key={cost.itemId}
                    className={`warehouse-recipe-item is-rarity-${material.rarity}${have < cost.count ? ' is-short' : ''}`}
                  >
                    <ItemIcon item={material} className="warehouse-recipe-icon" />
                    <span className="warehouse-recipe-name">{tItem[material.nameKey]}</span>
                    <span className="warehouse-recipe-count">
                      {have} <small>/ {cost.count}</small>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <div className="warehouse-detail-block">
          <h3 className="warehouse-detail-section-title">{t.sources}</h3>
          {sources.length === 0 ? (
            <span className="warehouse-detail-none">{item.recipe ? t.noDropRecipe : t.noDrop}</span>
          ) : (
            <>
              {/* 章が解放済みならジャンプ */}
              <ul className="warehouse-sources">
                {sources.map((s) => {
                  const chapter = chapterOf(s.stageId)
                  const className = `warehouse-source${s.sure ? ' is-sure' : ''}`
                  return (
                    <li key={s.stageId}>
                      {chapter <= maxChapter ? (
                        <Link to={paths.story} className={className} onClick={() => setCurrentChapter(chapter)}>
                          {s.stageId}
                        </Link>
                      ) : (
                        <span className={`${className} is-locked`}>{s.stageId}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
              <span className="warehouse-sources-note">{t.sourcesNote}</span>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
