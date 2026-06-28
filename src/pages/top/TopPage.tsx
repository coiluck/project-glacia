import Screen from '../../layouts/Screen'
import CharacterStage from './components/CharacterStage'
import EventBanner from './components/EventBanner'
import MenuButtons from './components/MenuButtons'
import SystemMenu from './components/SystemMenu'

// ホーム画面
export default function TopPage() {
  return (
    <Screen
      background="images/top/ice_port.jpg"
      viewport={
        <div className="page-top">
          <CharacterStage />
          <EventBanner />
          <MenuButtons />
          <SystemMenu />
        </div>
      }
    />
  )
}
