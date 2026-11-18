import { useEffect, useState } from 'react'
import { finishTutorial } from '../../../api/actions/tutorial'
import Guide from '../../../components/common/Guide'
import { uiTarget } from '../../../components/common/guideTarget'
import { useTranslations } from '../../../i18n'

const TRANSLATION_MAPPING = {
  storyMenu: 'storyMenu',
  storyMember: 'storyMember',
  storyRecruit: 'storyRecruit',
  storyEnd: 'storyEnd',
}
const NAME_MAPPING = { lapis: 'charLapis' }

// ui は data-guide 属性の値。最初だけメニューを開くのを待ち、あとは開いたメニューの項目を説明する
const STEPS = [
  { textKey: 'storyMenu', ui: 'menu', kind: 'action', delay: undefined },
  { textKey: 'storyMember', ui: 'menu-member', kind: 'tap', delay: 400 }, // メニューが開ききるまで待つ
  { textKey: 'storyRecruit', ui: 'menu-recruit', kind: 'tap', delay: undefined },
  { textKey: 'storyEnd', ui: null, kind: 'tap', delay: undefined }, // 指す場所のない締めの一言
] as const

// 1-1 をクリアして初めてマップに来たときのガイド
export default function StoryGuide({ onDone }: { onDone: () => void }) {
  const t = useTranslations('tutorial', TRANSLATION_MAPPING)
  const tName = useTranslations('characters', NAME_MAPPING)
  const [index, setIndex] = useState(0)
  const [nudge, setNudge] = useState(0)
  const step = STEPS[index]

  const next = () => {
    if (index < STEPS.length - 1) {
      setIndex(index + 1)
      return
    }
    finishTutorial('gacha').catch(console.error)
    onDone()
  }

  // メニューボタンが押されたら次へ。Guide は注目箇所の外の入力を止めているので、ここに届くのはメニューボタンだけ
  useEffect(() => {
    if (step.kind !== 'action') return
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest(`[data-guide="${step.ui}"]`)) next()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  })

  return (
    <Guide
      index={index}
      total={STEPS.length}
      kind={step.kind}
      delay={step.delay}
      text={t[step.textKey]}
      speakerId="lapis"
      speakerName={tName.lapis}
      nudge={nudge}
      targets={(scale) => {
        const target = step.ui && uiTarget(step.ui, scale)
        return target ? [target] : []
      }}
      onMiss={() => setNudge((n) => n + 1)}
      onNext={next}
    />
  )
}
