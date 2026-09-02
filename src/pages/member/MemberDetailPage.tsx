import { useState, type PointerEvent } from 'react'
import { Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Screen from '../../layouts/Screen'
import { paths } from '../../router/paths'
import { useTranslations } from '../../i18n'
import { useBackHandler } from '../../hooks/useBackHandler'
import AttackRangeHex from '../../components/common/AttackRangeHex'
import MemberLevelPanel from './components/MemberLevelPanel'
import MemberSkillPanel from './components/MemberSkillPanel'
import { characterMasters } from '../../data/characters'
import { classIcons } from '../../data/characters/classIcons'
import { RARITIES } from '../../data/characters/const'
import { unitClasses } from '../../data/unitClasses'
import { MAX_DUPE, MAX_SKILL_LEVEL, type DupeBonus } from '../../data/characters/types'
import { skillReach } from '../../features/battle/battle'
import { shapeTiles, type Axial } from '../../features/battle/hex'
import { formatSkillDescription } from '../../features/characters/describe'
import { resolveOwned } from '../../features/characters/resolve'
import { useCharacterStore } from '../../stores/characterStore'

// 射程プレビューの viewBox 基準。実寸は CSS 側で決める
const RANGE_HEX_SIZE = 20
const ORIGIN: Axial = { q: 0, r: 0 }

// detail がメイン。level と skill はサブで、どれも同じ1枠に入る
const PANELS = ['detail', 'level', 'skill'] as const
type PanelId = (typeof PANELS)[number]
type SubPanelId = Exclude<PanelId, 'detail'>

const PANEL_LABELS: Record<PanelId, string> = {
  detail: '詳細',
  level: 'レベル',
  skill: 'スキル',
}

// i18n。キャラ名・スキル名・スキルの説明文はどれも characters.json、
// 兵科名は battle.json にある
const CHARACTER_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).flatMap((c): [string, string][] => [
    [c.nameKey, c.nameKey],
    ...c.skills.flatMap((s): [string, string][] => [
      [s.def.nameKey, s.def.nameKey],
      [s.descriptionKey, s.descriptionKey],
    ]),
  ]),
)

const CLASS_TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(unitClasses).map((c) => [c.nameKey, c.nameKey]),
)

// 凸1つ分の効果。DupeBonus は数値の加算しか持たないのでここで文にする。
// 表示は1行1項目なので、繋げずに配列のまま返す
function describeDupeBonus(bonus: DupeBonus): string[] {
  const parts: string[] = []
  if (bonus.status?.hp) parts.push(`HP +${bonus.status.hp}`)
  if (bonus.status?.attack) parts.push(`ATK +${bonus.status.attack}`)
  if (bonus.status?.defense) parts.push(`DEF +${bonus.status.defense}`)
  if (bonus.skillApCost) parts.push(`スキルAP ${bonus.skillApCost}`)
  return parts
}

// 兵科アイコン。MemberCard と同じ六角バッジに収める
function ClassIcon({ classId }: { classId: string }) {
  const path = classIcons[classId]
  if (!path) return null
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d={path} />
    </svg>
  )
}

// ラベルと数値の1行。ステータスも通常攻撃も同じ形に揃える
function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="member-detail-stat-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

// キャラ詳細・強化画面
export default function MemberDetailPage() {
  const { characterId } = useParams()
  const tCharacter = useTranslations('characters', CHARACTER_TRANSLATION_MAPPING)
  const tClass = useTranslations('battle', CLASS_TRANSLATION_MAPPING)
  const owned = useCharacterStore((s) => s.owned)

  // ?panel=<パネル名>: 立ち絵とヘッダは動かさず、右側だけを差し替える
  const [searchParams, setSearchParams] = useSearchParams()
  const raw = searchParams.get('panel')
  const panel = PANELS.find((p) => p === raw) ?? 'detail'

  // 詳細に戻るスライドの間もサブ枠を空にしないよう、直前の1枚を覚えておく
  const [sub, setSub] = useState<SubPanelId>('level')
  if (panel !== 'detail' && panel !== sub) setSub(panel)

  // ツールチップを出している凸。スマホには hover の解除が無いので、
  // 「離れたら閉じる」ではなく「他所に触れたら閉じる」で畳む
  const [tip, setTip] = useState<number | null>(null)
  const closeTip = (e: PointerEvent<HTMLDivElement>) => {
    if (!(e.target as HTMLElement).closest('.member-detail-dupe-item')) setTip(null)
  }

  const navigate = useNavigate()
  const location = useLocation()

  // 詳細から強化パネルへ入るときだけ履歴を積む。強化パネル同士の移動では積まないので、
  // どのパネルからでも戻る1回で詳細に返る
  const goPanel = (next: PanelId) => {
    if (next === panel) return
    if (next !== 'detail') {
      setSearchParams({ panel: next }, { replace: panel !== 'detail' })
      return
    }
    // key === 'default' はこのURLが履歴の先頭にいる場合で、戻り先が無い
    if (location.key === 'default') setSearchParams({}, { replace: true })
    else navigate(-1)
  }

  // リソースバーの戻るボタン。履歴があるなら pop に任せればよく、
  // 戻り先が無いときだけ横取りして詳細に返す
  useBackHandler(() => {
    if (panel === 'detail' || location.key !== 'default') return false
    setSearchParams({}, { replace: true })
    return true
  })

  const character = resolveOwned(owned, characterId ?? '')
  // 未所持・マスター未定義なら一覧へ
  if (!character) return <Navigate to={paths.member} replace />

  const { master, user, selectedSkill } = character
  const unitClass = unitClasses[master.classId]
  const expProgress = character.expToNext === null ? 1 : user.exp / character.expToNext

  // 通常攻撃で選べる対象数。味方の兵科は今のところ全て単体
  const attackTargets = !unitClass
    ? '--'
    : unitClass.attackTargets === 'infinity'
      ? '範囲全体'
      : `${unitClass.attackTargets}体`

  return (
    <>
      <div className="page page-member-detail" onPointerOver={closeTip}>
        <div className="member-detail-portrait">
          <img
            src={`${import.meta.env.BASE_URL}images/character/full_body/${master.id}.png`}
            alt={tCharacter[master.nameKey]}
          />
        </div>

        <div className={`member-detail-body is-rarity-${master.rarity}`}>
          {/* ヘッダとレベルはパネルを切り替えても動かない */}
          <div className="member-detail-header">
            <span className="member-detail-class-badge">
              <ClassIcon classId={master.classId} />
            </span>

            <div className="member-detail-title">
              <p className="member-detail-class">{unitClass ? tClass[unitClass.nameKey] : ''}</p>
              <p className="member-detail-name">{tCharacter[master.nameKey]}</p>
            </div>

            <div className="member-detail-rarity">
              {RARITIES.map((rarity) => (
                <span
                  key={rarity}
                  className={`member-detail-star${rarity <= master.rarity ? '' : ' is-off'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* レベル。数値・経験値のレール・強化への入口を1行に収める */}
          <div className="member-detail-level">
            <span className="member-detail-level-value">
              <span className="member-detail-level-label">LV</span>
              <span className="member-detail-level-current">{character.level}</span>
              <span className="member-detail-level-max">/{character.maxLevel}</span>
            </span>

            <span className="member-detail-level-exp">
              <span className="member-detail-level-bar">
                <span
                  className="member-detail-level-bar-fill"
                  style={{ width: `${expProgress * 100}%` }}
                />
              </span>
              {/* レベル上限なら満タンで止める */}
              <span className="member-detail-level-exp-text">
                {character.expToNext === null ? 'EXP MAX' : `${user.exp} / ${character.expToNext}`}
              </span>
            </span>

            <button
              type="button"
              className={`member-detail-panel-link is-strong${panel === 'level' ? ' is-active' : ''}`}
              onClick={() => goPanel('level')}
            >
              強化
            </button>
          </div>

          <div className="member-detail-window">
            <div
              className="member-detail-track"
              style={{ transform: `translateX(${panel === 'detail' ? 0 : -100}%)` }}
            >
              {/* メイン */}
              <div className="member-detail-panel">
                {/* ステータスと通常攻撃。どちらも同じ行リストで、右端に射程を置く */}
                <section className="member-detail-ability">
                  <div className="member-detail-ability-col">
                    <h2 className="member-detail-section-title">ステータス</h2>
                    <dl className="member-detail-stat-rows">
                      <StatRow label="HP" value={character.status.hp} />
                      <StatRow label="ATK" value={character.status.attack} />
                      <StatRow label="DEF" value={character.status.defense} />
                      <StatRow label="ターンAP" value={unitClass?.apPerTurn ?? '--'} />
                    </dl>
                  </div>

                  {/* 通常攻撃は兵科そのものの性能なので育成では変わらない */}
                  <div className="member-detail-ability-col">
                    <h2 className="member-detail-section-title">通常攻撃</h2>
                    <dl className="member-detail-stat-rows">
                      <StatRow label="威力" value={unitClass?.attackPower ?? '--'} />
                      <StatRow label="消費AP" value={unitClass?.attackCost ?? '--'} />
                      <StatRow label="対象" value={attackTargets} />
                    </dl>
                  </div>

                  <div className="member-detail-ability-range">
                    <h2 className="member-detail-section-title">射程</h2>
                    <div className="member-detail-range-tile">
                      {unitClass && (
                        <AttackRangeHex
                          tiles={shapeTiles(ORIGIN, unitClass.attackRange)}
                          size={RANGE_HEX_SIZE}
                        />
                      )}
                    </div>
                  </div>
                </section>

                {/* 出撃時に使う1つだけを出す。差し替えと Lv 上げはスキルパネル側 */}
                <section className="member-detail-block">
                  <div className="member-detail-block-head">
                    <h2 className="member-detail-section-title">出撃スキル</h2>
                    <button
                      type="button"
                      className={`member-detail-panel-link${panel === 'skill' ? ' is-active' : ''}`}
                      onClick={() => goPanel('skill')}
                    >
                      スキル一覧
                    </button>
                  </div>

                  <div className="member-detail-skill">
                    <div className="member-detail-skill-range">
                      <AttackRangeHex tiles={skillReach(selectedSkill.def)} size={RANGE_HEX_SIZE} />
                    </div>

                    <div className="member-detail-skill-main">
                      <div className="member-detail-skill-head">
                        <span className="member-detail-skill-name">
                          {tCharacter[selectedSkill.def.nameKey]}
                        </span>
                        <span className="member-detail-skill-level">
                          Lv.{selectedSkill.level}/{MAX_SKILL_LEVEL}
                        </span>
                        <span className="member-detail-skill-cost">AP {selectedSkill.def.apCost}</span>
                      </div>

                      <p className="member-detail-skill-description">
                        {formatSkillDescription(
                          tCharacter[selectedSkill.descriptionKey] ?? '',
                          selectedSkill,
                        )}
                      </p>
                    </div>
                  </div>
                </section>

                {/* 凸。ガチャで重ねるものなのでここに操作は無い */}
                <section className="member-detail-block">
                  <div className="member-detail-block-head">
                    <h2 className="member-detail-section-title">凸</h2>
                    <span className="member-detail-block-count">
                      {user.dupe}/{MAX_DUPE}
                    </span>
                  </div>
                  <ul className="member-detail-dupe-list">
                    {master.dupeBonuses.map((bonus, i) => (
                      <li
                        key={i}
                        className={`member-detail-dupe-item${i < user.dupe ? ' is-unlocked' : ''}${
                          tip === i ? ' is-tipped' : ''
                        }`}
                        onPointerEnter={() => setTip(i)}
                      >
                        <span className="member-detail-dupe-node">{i + 1}</span>
                        <span className="member-detail-dupe-tip" role="tooltip">
                          {describeDupeBonus(bonus).map((part) => (
                            <span key={part}>{part}</span>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* サブ。レベルとスキルはこの1枠を使い回す */}
              <div className="member-detail-panel">
                <div className="member-detail-subhead">
                  <button
                    type="button"
                    className="member-detail-back"
                    onClick={() => goPanel('detail')}
                  >
                    戻る
                  </button>
                  <span className="member-detail-subtitle">{PANEL_LABELS[sub]}</span>
                </div>

                {sub === 'level' ? (
                  <MemberLevelPanel character={character} />
                ) : (
                  <MemberSkillPanel character={character} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Screen background="images/start/hex-frame.jpg" />
    </>
  )
}
