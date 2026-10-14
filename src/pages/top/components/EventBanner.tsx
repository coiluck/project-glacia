import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EVENTS } from '../../../data/event'

// 自動で次のバナーへ送る間隔
const AUTO_SLIDE_MS = 10000

export default function EventBanner() {
  // 毎回同じ並びだとつまらないので、開くたびにざっくり混ぜる
  const [events] = useState(() => [...EVENTS].sort(() => Math.random() - 0.5))
  const [eventIndex, setEventIndex] = useState(0)

  // 手で動かしたらそこから数え直す
  useEffect(() => {
    const id = setTimeout(() => {
      setEventIndex((i) => (i + 1) % events.length)
    }, AUTO_SLIDE_MS)
    return () => clearTimeout(id)
  }, [eventIndex, events.length])

  return (
    <div className="top-event-banner-area">
      <div className="top-event-banner-list">
        {events.map((event) => (
          <Link
            key={event.id}
            to={event.link}
            className="top-event-banner"
            style={{ transform: `translateX(${-eventIndex * 100}%)` }}
          >
            <img className="top-event-banner-image" src={`${import.meta.env.BASE_URL}${event.image}`} alt={event.title} />
          </Link>
        ))}
      </div>
      <div className="top-event-banner-indicator">
        {events.map((event, index) => (
          <button
            key={event.id}
            className={`top-event-banner-indicator-button${index === eventIndex ? ' is-active' : ''}`}
            aria-label={event.title}
            onClick={() => setEventIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
