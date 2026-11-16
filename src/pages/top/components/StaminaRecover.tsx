// スタミナ回復のダイアログ。回復までの時間と、回復アイテムを使うところ
import { useState } from 'react'
import { recoverStamina } from '../../../api/actions/stamina'
import ItemIcon from '../../../components/common/ItemIcon'
import { items } from '../../../data/items'
import { useTranslations } from '../../../i18n'
import ViewportLayer from '../../../layouts/ViewportLayer'
import { useInventoryStore } from '../../../stores/inventoryStore'
import { selectStamina, useStaminaStore } from '../../../stores/staminaStore'
import { formatHms } from '../../../utils/format'
import { withNumbers } from './system/format'

// 回復アイテムは今のところ携行食だけ
const ITEM = items.fieldRation
const GAIN = ITEM.stamina ?? 0

const TRANSLATION_MAPPING = {
  title: 'staminaRecover',
  full: 'staminaFull',
  toNext: 'staminaToNext',
  toFull: 'staminaToFull',
  itemInfo: 'staminaItemInfo',
  countMax: 'staminaCountMax',
  cancel: 'staminaCancel',
  use: 'staminaUse',
}

export default function StaminaRecover({ onClose }: { onClose: () => void }) {
  const t = useTranslations('top', TRANSLATION_MAPPING)
  const itemName = useTranslations('items', { name: ITEM.nameKey })
  const stamina = useStaminaStore((s) => selectStamina(s).stamina)
  const staminaMax = useStaminaStore((s) => s.base.stamina_max)
  const toNext = useStaminaStore((s) => selectStamina(s).stamina_recovering_seconds)
  const toFull = useStaminaStore((s) => selectStamina(s).stamina_recovering_seconds_max)
  const owned = useInventoryStore((s) => s.items[ITEM.id] ?? 0)

  const [wanted, setWanted] = useState(1)
  const [pending, setPending] = useState(false)
  // 持っている数まで。持っていなければ 0
  const count = Math.min(wanted, owned)

  const use = async () => {
    if (pending || count === 0) return
    setPending(true)
    try {
      await recoverStamina({ itemId: ITEM.id, count })
      onClose()
    } catch (e) {
      console.error(e)
      setPending(false)
    }
  }

  return (
    <ViewportLayer>
      <div className="stamina-recover fade-in">
        <div className="stamina-recover-backdrop" onClick={onClose} />
        <div className="stamina-recover-safe">
          <section className="stamina-recover-dialog">
            <header className="stamina-recover-head">
              <i />
              <h2>{t.title}</h2>
              <dl>
                {stamina >= staminaMax ? (
                  <dt>{t.full}</dt>
                ) : (
                  <>
                    <dt>{t.toNext}</dt>
                    <dd>{formatHms(toNext)}</dd>
                    <dt>{t.toFull}</dt>
                    <dd>{formatHms(toFull)}</dd>
                  </>
                )}
              </dl>
            </header>

            <div className="stamina-recover-main">
              <div className="stamina-recover-value">
                <span className="stamina-recover-num now">{stamina}</span>
                <i className="arrow" />
                <span className="stamina-recover-num after">{stamina + GAIN * count}</span>
                <span className="stamina-recover-num max">/ {staminaMax}</span>
                <span className="stamina-recover-num gain">+{GAIN * count}</span>
              </div>

              <div className="stamina-recover-item">
                <div className="stamina-recover-item-tile">
                  <ItemIcon item={ITEM} className="stamina-recover-item-icon" />
                </div>
                <div>
                  <p className="stamina-recover-item-name">{itemName.name}</p>
                  <p className="stamina-recover-item-info">{t.itemInfo && withNumbers(t.itemInfo, GAIN, owned)}</p>
                </div>
                <div className="stamina-recover-stepper">
                  <button type="button" disabled={count <= 1} onClick={() => setWanted(count - 1)}>
                    −
                  </button>
                  <span className="stamina-recover-num">{count}</span>
                  <button type="button" disabled={count >= owned} onClick={() => setWanted(count + 1)}>
                    +
                  </button>
                  <button type="button" className="is-max" disabled={count >= owned} onClick={() => setWanted(owned)}>
                    {t.countMax}
                  </button>
                </div>
              </div>
            </div>

            <footer className="stamina-recover-foot">
              <button type="button" className="stamina-recover-button" onClick={onClose}>
                {t.cancel}
              </button>
              <button
                type="button"
                className="stamina-recover-button is-primary"
                disabled={count === 0 || pending}
                onClick={use}
              >
                {t.use}
              </button>
            </footer>
          </section>
        </div>
      </div>
    </ViewportLayer>
  )
}
