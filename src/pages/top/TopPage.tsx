import ViewportLayer from '../../layouts/ViewportLayer'
import CharacterStage from './components/CharacterStage'
import EventBanner from './components/EventBanner'
import MenuButtons from './components/MenuButtons'
import SystemMenu from './components/SystemMenu'

// ホーム画面
export default function TopPage() {
  return (
    <ViewportLayer>
      <div className="page-top">
        <CharacterStage />
        <EventBanner />
        <MenuButtons />
        <SystemMenu />
      </div>
    </ViewportLayer>
  )
}
