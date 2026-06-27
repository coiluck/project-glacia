import { useState, useEffect } from 'react'

export const AVAILABLE_LANGS = ['en', 'ja'] as const
type Lang = typeof AVAILABLE_LANGS[number]

const CURRENT_LANG: Lang = 'ja'
const DEFAULT_LANG: Lang = AVAILABLE_LANGS[0] // 'en'
type Namespace = Record<string, string> // key, 翻訳テキスト

// ── internal ──────────────────────────────────────────────
const cache = new Map<string, Namespace>() // key: `${lang}/${ns}`
const inflight = new Map<string, Promise<Namespace>>()

async function loadNamespace(lang: Lang, ns: string): Promise<Namespace> {
  const cacheKey = `${lang}/${ns}`
  const cached = cache.get(cacheKey)
  if (cached) return cached

  let promise = inflight.get(cacheKey)
  if (!promise) {
    promise = fetch(`${import.meta.env.BASE_URL}json/i18n/${lang}/${ns}.json`)
      .then(res => res.json() as Promise<Namespace>)
      .then(data => {
        cache.set(cacheKey, data)
        inflight.delete(cacheKey)
        return data
      })
    inflight.set(cacheKey, promise)
  }
  return promise
}

async function getTranslatedText(ns: string, key: string, lang: Lang): Promise<string> {
  const data = await loadNamespace(lang, ns)
  if (key in data) return data[key]

  // jsonにない -> フォールバック
  if (lang !== DEFAULT_LANG) {
    const fallback = await loadNamespace(DEFAULT_LANG, ns)
    if (key in fallback) return fallback[key]
  }
  console.warn(`Invalid translation key: ${ns}:${key}`)
  return ''
}

export function useTranslations<T extends Record<string, string>>(
  ns: string, // ページ名（= JSONのファイル名）
  mapping: T
): T {
  const localKeys = Object.keys(mapping) as (keyof T)[]
  const translationKeys = Object.values(mapping) as string[]

  // TODO: const lang = useSettingsStore(s => s.lang)
  const lang = CURRENT_LANG

  const [translations, setTranslations] = useState<T>(
    () => Object.fromEntries(localKeys.map(k => [k, ''])) as T
  )

  useEffect(() => {
    let cancelled = false
    Promise.all(translationKeys.map(key => getTranslatedText(ns, key, lang))).then(values => {
      if (cancelled) return // lang 連打時の古い結果の上書きを防止
      setTranslations(Object.fromEntries(localKeys.map((k, i) => [k, values[i]])) as T)
    })
    return () => {
      cancelled = true
    }
  }, [lang, ns])

  return translations
}
