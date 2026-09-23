import { useState } from 'react'
import { setFavoriteCharacter } from '../../../api/actions/favorite'
import { characterMasters } from '../../../data/characters'
import { useTranslations } from '../../../i18n'
import { useCharacterStore } from '../../../stores/characterStore'

const TRANSLATION_MAPPING = Object.fromEntries(
  Object.values(characterMasters).flatMap((c): [string, string][] => [
    [c.nameKey, c.nameKey],
    [c.topLineKey, c.topLineKey],
  ]),
)

export default function CharacterStage() {
  const owned = useCharacterStore((s) => s.owned)
  const favoriteId = useCharacterStore((s) => s.favoriteCharacterId)
  const master = characterMasters[favoriteId]
  const t = useTranslations('characters', TRANSLATION_MAPPING)
  const name = t[master.nameKey]
  const [isOpen, setIsOpen] = useState(false)
  const [pending, setPending] = useState(false)

  const choices = Object.values(characterMasters)
    .filter((m) => owned[m.id])
    .sort((a, b) => b.rarity - a.rarity)

  const pick = async (masterId: string) => {
    if (pending || masterId === favoriteId) return
    setPending(true)
    try {
      await setFavoriteCharacter(masterId)
    } catch (e) {
      console.error(e)
    } finally {
      setPending(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="top-character">
      {name && (
        <div className="top-character-text-container">
          <div className="top-character-header">
            <p className="top-character-name">{name}</p>
            <div className="top-character-change">
              <button
                className={`top-character-change-button${isOpen ? ' is-open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="top-character-change-icon" />
                <span className="top-character-change-close" />
              </button>
              <div
                className={`top-character-change-panel${isOpen ? ' is-open' : ''}`}
                aria-hidden={!isOpen}
              >
                <div className="top-character-change-panel-inner">
                  {choices.map((m) => (
                    <button
                      key={m.id}
                      className={`top-character-change-item${m.id === favoriteId ? ' is-selected' : ''}`}
                      onClick={() => pick(m.id)}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}images/character/face/${m.id}.png`}
                        alt={t[m.nameKey]}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="top-character-line">{t[master.topLineKey]}</p>
        </div>
      )}
      <div className="top-character-art" aria-hidden>
        <img
          key={master.id}
          className="fade-in"
          src={`${import.meta.env.BASE_URL}images/character/full_body/${master.id}.png`}
          alt={name}
        />
      </div>
    </div>
  )
}
