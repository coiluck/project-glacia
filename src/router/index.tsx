import { createBrowserRouter, Navigate } from 'react-router-dom'
import { paths } from './paths'
import RootLayout from '../layouts/RootLayout'
import BootPage from '../pages/boot/BootPage'
import StartPage from '../pages/start/StartPage'
import TopPage from '../pages/top/TopPage'
import PartyPage from '../pages/party/PartyPage'
import StoryMapPage from '../pages/story/StoryMapPage'
import ScenarioPage from '../pages/scenario/ScenarioPage'
import BattlePage from '../pages/battle/BattlePage'
import MemberPage from '../pages/member/MemberPage'
import RecruitPage from '../pages/recruit/RecruitPage'
import BasePage from '../pages/base/BasePage'

// 起動フロー（ロゴ→スタート）を通過済みかどうかでホーム表示を出し分ける。
// 同一セッションでホームへ戻ったときに毎回ロゴへ戻らないよう sessionStorage で判定する。
function HomeOrBoot() {
  if (!sessionStorage.getItem('glacia:booted')) {
    return <Navigate to={paths.boot} replace />
  }
  return <TopPage />
}

// ルート定義。新しい画面を足すときはここに追加し、パスは paths.ts に定義する。
// basename は vite の base（/project-glacia/）に合わせる。
export const router = createBrowserRouter(
  [
    // 起動フローはリソースバー無しの全画面で表示するため RootLayout の外に置く。
    { path: 'boot', element: <BootPage /> }, // 起動時のロゴ画面
    { path: 'start', element: <StartPage /> }, // スタート画面（タップ／初回ログイン）
    {
      element: <RootLayout />,
      children: [
        { index: true, element: <HomeOrBoot /> }, // Top（ホーム）。未起動ならロゴへ誘導
        { path: 'party', element: <PartyPage /> }, // 編成
        { path: 'story', element: <StoryMapPage /> }, // ステージマップ
        { path: 'member', element: <MemberPage /> }, // 人員
        { path: 'recruit', element: <RecruitPage /> }, // 召集
        { path: 'base', element: <BasePage /> }, // 基地
      ],
    },
    { path: 'battle/:stageId', element: <BattlePage /> }, // 戦闘
    { path: 'scenario/:scenarioId', element: <ScenarioPage /> }, // シナリオ
  ],
  { basename: import.meta.env.BASE_URL },
)
