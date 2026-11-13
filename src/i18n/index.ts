import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { useSettingsStore } from '../stores/settingsStore'

export const AVAILABLE_LANGS = ['en', 'ja'] as const
type Lang = typeof AVAILABLE_LANGS[number]

const DEFAULT_LANG: Lang = AVAILABLE_LANGS[0] // 'en'
type Namespace = Record<string, string> // key, 翻訳テキスト
type Cache = ReadonlyMap<string, Namespace> // key: `${lang}/${ns}`

// ── internal ──────────────────────────────────────────────
// 名前空間が届くたびに新しい Map に差し替え、購読しているフックを再レンダーさせる
let cache: Cache = new Map()
const inflight = new Map<string, Promise<Namespace>>()
const listeners = new Set<() => void>()
const warned = new Set<string>() // 同じ不正キーの警告はレンダーごとに出さない

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const getCache = () => cache

function loadNamespace(lang: Lang, ns: string): Promise<Namespace> {
  const cacheKey = `${lang}/${ns}`
  const cached = cache.get(cacheKey)
  if (cached) return Promise.resolve(cached)

  let promise = inflight.get(cacheKey)
  if (!promise) {
    promise = fetch(`${import.meta.env.BASE_URL}json/i18n/${lang}/${ns}.json`)
      .then(res => res.json() as Promise<Namespace>)
      .then(data => {
        cache = new Map(cache).set(cacheKey, data)
        inflight.delete(cacheKey)
        listeners.forEach(l => l())
        return data
      })
    inflight.set(cacheKey, promise)
  }
  return promise
}

// 読み込み前は ''
function translate(data: Cache, ns: string, key: string, lang: Lang): string {
  const texts = data.get(`${lang}/${ns}`)
  if (!texts) return ''
  if (key in texts) return texts[key]

  // jsonにない -> フォールバック
  if (lang !== DEFAULT_LANG) {
    const fallback = data.get(`${DEFAULT_LANG}/${ns}`)
    if (!fallback) return ''
    if (key in fallback) return fallback[key]
  }
  const warnKey = `${ns}:${key}`
  if (!warned.has(warnKey)) {
    warned.add(warnKey)
    console.warn(`Invalid translation key: ${warnKey}`)
  }
  return ''
}

export function useTranslations<T extends Record<string, string>>(
  ns: string, // ページ名（= JSONのファイル名）
  mapping: T
): T {
  const lang = useSettingsStore(s => s.lang)
  const data = useSyncExternalStore(subscribe, getCache)

  // 足りないキーがあるときだけフォールバックの名前空間も読む
  useEffect(() => {
    void loadNamespace(lang, ns).then(texts => {
      if (lang === DEFAULT_LANG) return
      if (Object.values(mapping).some(key => !(key in texts))) void loadNamespace(DEFAULT_LANG, ns)
    })
  }, [lang, ns, mapping])

  return useMemo(
    () => Object.fromEntries(
      Object.entries(mapping).map(([name, key]) => [name, translate(data, ns, key, lang)])
    ) as T,
    [data, ns, mapping, lang]
  )
}

export { fill } from './fill'
