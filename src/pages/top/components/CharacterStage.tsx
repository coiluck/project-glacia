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
  const master = characterMasters[useCharacterStore((s) => s.favoriteCharacterId)]
  const t = useTranslations('characters', TRANSLATION_MAPPING)
  const name = t[master.nameKey]

  return (
    <div className="top-character">
      {name && (
        <div className="top-character-text-container">
          <p className="top-character-name">{name}</p>
          <p className="top-character-line">{t[master.topLineKey]}</p>
        </div>
      )}
      <div className="top-character-art" aria-hidden>
        <img
          src={`${import.meta.env.BASE_URL}images/character/full_body/${master.id}.png`}
          alt={name}
        />
      </div>
    </div>
  )
}
