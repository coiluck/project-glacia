// システムメニューとパネルのタブ
export const SYSTEM_TABS = [
  { key: 'news',     icon: 'images/top/menu/warning.svg',  labelKey: 'tabNews' },
  { key: 'mail',     icon: 'images/top/menu/mail.svg',     labelKey: 'tabMail' },
  { key: 'scenario', icon: 'images/top/menu/scenario.svg', labelKey: 'tabScenario' },
  { key: 'settings', icon: 'images/top/menu/gear.svg',     labelKey: 'tabSettings' },
] as const

export type SystemTabKey = (typeof SYSTEM_TABS)[number]['key']

export const SYSTEM_TAB_LABELS = Object.fromEntries(SYSTEM_TABS.map((t) => [t.labelKey, t.labelKey]))
