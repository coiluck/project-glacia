import StoryPanel from './components/StoryPanel'
import MenuButtons from './components/MenuButtons'

// Top（ホーム）画面。中央にキャラ立ち絵、右に物語パネル、各種メニューへの導線。
export default function TopPage() {
  return (
    <div className="page page-top">
      <h1>HOME</h1>
      {/* TODO: 中央キャラ立ち絵 / 左サイドメニュー（設定・お知らせ等） */}
      <StoryPanel />
      <MenuButtons />
    </div>
  )
}
