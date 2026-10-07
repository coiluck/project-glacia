import { useEffect, useState } from 'react'
import { useTranslations } from '../../../../../i18n'
import { news, type NewsCategory } from '../../../../../data/news'
import { useNewsReadStore, useUnreadNewsCount } from '../../../../../features/news/newsReadStore'
import { withNumbers } from '../format'

const TEXT_MAPPING = Object.fromEntries(
  news.flatMap((n) => [
    [`${n.id}.title`, `${n.id}.title`],
    [`${n.id}.body`, `${n.id}.body`],
  ]),
)

const CATEGORY_MAPPING: Record<NewsCategory, string> = {
  maintenance: 'newsMaintenance',
  event: 'newsEvent',
  bug: 'newsBug',
  info: 'newsInfo',
}

// 10/07 のように月日だけ出す
const shortDate = (date: string) => date.slice(5).replace('-', '/')

export default function NewsTab() {
  const t = useTranslations('system', {
    unread: 'newsUnread',
    empty: 'newsEmpty',
  })
  const category = useTranslations('system', CATEGORY_MAPPING)
  const text = useTranslations('news', TEXT_MAPPING)
  const readIds = useNewsReadStore((s) => s.readIds)
  const markRead = useNewsReadStore((s) => s.markRead)
  const unread = useUnreadNewsCount()

  const [selectedId, setSelectedId] = useState(news[0]?.id)
  const selected = news.find((n) => n.id === selectedId)

  // 本文を開いたものは既読
  useEffect(() => {
    if (selectedId) markRead(selectedId)
  }, [selectedId, markRead])

  if (!selected) return <p className="system-panel-empty">{t.empty}</p>

  return (
    <>
      <p className="system-panel-summary">{t.unread && withNumbers(t.unread, unread)}</p>
      <div className="system-news">
        <div className="system-news-list">
          {news.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`system-news-row system-notch${n.id === selectedId ? ' is-selected' : ''}`}
              onClick={() => setSelectedId(n.id)}
            >
              <span className="system-news-row-head">
                <i className={`system-dot${readIds.includes(n.id) ? ' is-off' : ''}`} />
                <span className={`system-tag is-${n.category}`}>{category[n.category]}</span>
                <span className="system-news-date">{shortDate(n.date)}</span>
              </span>
              <span className="system-news-row-title">{text[`${n.id}.title`]}</span>
            </button>
          ))}
        </div>

        <article className="system-news-body system-notch">
          <div className="meta">
            <span className={`system-tag is-${selected.category}`}>{category[selected.category]}</span>
            <span className="system-news-date">{selected.date.replace(/-/g, '/')}</span>
          </div>
          <h3>{text[`${selected.id}.title`]}</h3>
          <p>{text[`${selected.id}.body`]}</p>
        </article>
      </div>
    </>
  )
}
