import { Link } from 'react-router-dom'
import { paths } from '../../../router/paths'
import { items, type ItemDef, type ItemKind } from '../../../data/items'
import { characterMasters } from '../../../data/characters'
import { RARITIES } from '../../../data/characters/const'
import { fill, useTranslations } from '../../../i18n'
import { useProgressStore } from '../../../stores/progressStore'
import { useCharacterStore } from '../../../stores/characterStore'
import { chapterOf, dropSources, type DropSource } from '../dropSources'
import { growthUses, productsOf } from '../usage'
import HexIcon from './HexIcon'

const KIND_LABEL: Record<ItemKind, string> = { material: 'kindMaterial', book: 'kindBook', exp: 'kindExp' }

const ITEM_TRANSLATION_MAPPING = Object.fromEntries([
  ...Object.values(items).map((i) => [i.nameKey, i.nameKey]),
  ...Object.values(KIND_LABEL).map((k) => [k, k]),
])

const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).flatMap((c) => [
    [c.nameKey, c.nameKey],
    ...c.skills.map((s) => [s.def.nameKey, s.def.nameKey]),
  ]),
)

const WAREHOUSE_TRANSLATION_MAPPING = {
  owned: 'owned',
  expDesc: 'expDesc',
  sources: 'sources',
  sourcesNote: 'sourcesNote',
  noDrop: 'noDrop',
  noDropRecipe: 'noDropRecipe',
  chapter: 'chapter',
  lockedChapter: 'lockedChapter',
  lockedSep: 'lockedSep',
  locked: 'locked',
  recipe: 'recipe',
  usage: 'usage',
  limitBreak: 'limitBreak',
  skillLevel: 'skillLevel',
}

const faceUrl = (id: string) => `${import.meta.env.BASE_URL}images/character/face/${id}.avif`

type Props = {
  item: ItemDef
  owned: Record<string, number>
  onSelect: (id: string) => void
}

export default function ItemDetail({ item, owned, onSelect }: Props) {
  const tItem = useTranslations('items', ITEM_TRANSLATION_MAPPING)
  const tChar = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)
  const t = useTranslations('warehouse', WAREHOUSE_TRANSLATION_MAPPING)
  const maxChapter = useProgressStore((s) => s.chapter)
  const setCurrentChapter = useProgressStore((s) => s.setCurrentChapter)
  const characters = useCharacterStore((s) => s.owned)

  const count = owned[item.id] ?? 0

  const byChapter = new Map<number, DropSource[]>()
  for (const s of dropSources[item.id] ?? []) {
    const chapter = chapterOf(s.stageId)
    byChapter.set(chapter, [...(byChapter.get(chapter) ?? []), s])
  }
  const chapters = [...byChapter].sort(([a], [b]) => a - b)
  const open = chapters.filter(([c]) => c <= maxChapter)
  const locked = chapters.filter(([c]) => c > maxChapter)

  const uses = growthUses(item.id, Object.values(characters))
  const products = productsOf(item.id)

  return (
    <section className="warehouse-detail">
      <div key={item.id} className="warehouse-detail-body">
        <div className="warehouse-detail-head">
          <HexIcon item={item} />
          <div className="warehouse-detail-title">
            <span className="warehouse-tag">
              {tItem[KIND_LABEL[item.kind]]}
              <span className="warehouse-stars">
                {RARITIES.map((r) => (r <= item.rarity ? '★' : <i key={r}>★</i>))}
              </span>
            </span>
            <span className="warehouse-detail-name">{tItem[item.nameKey]}</span>
          </div>
          <div className={`warehouse-detail-owned${count === 0 ? ' is-zero' : ''}`}>
            <small>{t.owned}</small>
            <b>{count}</b>
          </div>
        </div>

        {item.exp !== undefined && <p className="warehouse-detail-desc">{fill(t.expDesc, item.exp, item.exp)}</p>}

        <div className="warehouse-detail-block">
          <h3 className="warehouse-detail-section-title">
            {t.sources}
            {open.length > 0 && <em>{t.sourcesNote}</em>}
          </h3>
          {chapters.length === 0 && (
            <span className="warehouse-detail-none">{item.recipe ? t.noDropRecipe : t.noDrop}</span>
          )}
          {open.map(([chapter, list]) => (
            <div key={chapter} className="warehouse-sources">
              <span className="warehouse-sources-chapter">{fill(t.chapter, chapter)}</span>
              <ul>
                {list.map((s) => (
                  <li key={s.stageId}>
                    <Link
                      to={paths.story}
                      className={`warehouse-source${s.sure ? ' is-sure' : ''}`}
                      onClick={() => setCurrentChapter(chapter)}
                    >
                      {s.stageId}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {locked.length > 0 && (
            <span className="warehouse-sources-locked">
              {fill(t.locked, locked.map(([c, list]) => fill(t.lockedChapter, c, list.length)).join(t.lockedSep))}
            </span>
          )}
        </div>

        {item.recipe && (
          <div className="warehouse-detail-block">
            <h3 className="warehouse-detail-section-title">{t.recipe}</h3>
            <ul className="warehouse-lines">
              {item.recipe.map((cost) => {
                const material = items[cost.itemId]
                const have = owned[cost.itemId] ?? 0
                return (
                  <li key={cost.itemId} className={`warehouse-line${have < cost.count ? ' is-short' : ''}`}>
                    <HexIcon item={material} />
                    <span className="warehouse-line-name">{tItem[material.nameKey]}</span>
                    <span className="warehouse-line-value">
                      {have} <small>/ {cost.count}</small>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {(uses.length > 0 || products.length > 0) && (
          <div className="warehouse-detail-block">
            <h3 className="warehouse-detail-section-title">{t.usage}</h3>
            {uses.length > 0 && (
              <ul className="warehouse-lines">
                {uses.map((u) => {
                  const master = characterMasters[u.characterId]
                  const skill = master.skills.find((s) => s.def.id === u.skillId)
                  return (
                    <li key={`${u.characterId}-${u.skillId}`} className="warehouse-line">
                      <img className="warehouse-line-face" src={faceUrl(u.characterId)} alt="" />
                      <span className="warehouse-line-name">
                        {tChar[master.nameKey]}
                        <small>{skill ? fill(t.skillLevel, tChar[skill.def.nameKey], u.level) : t.limitBreak}</small>
                      </span>
                      <span className="warehouse-line-value">{u.count}</span>
                    </li>
                  )
                })}
              </ul>
            )}
            {products.length > 0 && (
              <ul className="warehouse-products">
                {products.map((p) => (
                  <li key={p.id}>
                    <button type="button" className="warehouse-product" onClick={() => onSelect(p.id)}>
                      <HexIcon item={p} />
                      {tItem[p.nameKey]}
                      <small>×{p.recipe!.find((c) => c.itemId === item.id)!.count}</small>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
