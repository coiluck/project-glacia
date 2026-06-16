import { Link } from 'react-router-dom'
import { paths } from '../../../router/paths'

// 物語(STORY)パネル。現在進行中ステージを表示し、シナリオマップへ誘導する。
export default function StoryPanel() {
  return (
    <section className="story-panel">
      <h2>物語 / STORY</h2>
      <p>現在進行中: STAGE --</p>
      <Link to={paths.story}>▶ 進む</Link>
    </section>
  )
}
