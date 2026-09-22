import { createBrowserRouter } from 'react-router-dom'
import HomeOrBoot from './HomeOrBoot'
import RootLayout from '../layouts/RootLayout'
import BootPage from '../pages/boot/BootPage'
import StartPage from '../pages/start/StartPage'
import PartyPage from '../pages/party/PartyPage'
import StoryMapPage from '../pages/story/StoryMapPage'
import ScenarioPage from '../pages/scenario/ScenarioPage'
import BattlePage from '../pages/battle/BattlePage'
import MemberPage from '../pages/member/MemberPage'
import MemberDetailPage from '../pages/member/MemberDetailPage'
import RecruitPage from '../pages/recruit/RecruitPage'
import BasePage from '../pages/base/BasePage'
import WarehousePage from '../pages/warehouse/WarehousePage'
import ExchangePage from '../pages/exchange/ExchangePage'

export const router = createBrowserRouter(
  [
    { path: 'boot', element: <BootPage /> }, // 起動時のロゴ画面
    { path: 'start', element: <StartPage /> }, // スタート画面
    {
      element: <RootLayout />,
      children: [
        { index: true, element: <HomeOrBoot /> }, // Top（ホーム）。未起動ならロゴへ
        { path: 'party', element: <PartyPage /> }, // 編成
        { path: 'story', element: <StoryMapPage /> }, // ステージマップ
        { path: 'member', element: <MemberPage /> }, // 人員
        { path: 'member/:characterId', element: <MemberDetailPage /> }, // キャラ詳細・強化
        { path: 'recruit', element: <RecruitPage /> }, // 召集
        { path: 'base', element: <BasePage /> }, // 基地
        { path: 'warehouse', element: <WarehousePage /> }, // 倉庫
        { path: 'exchange', element: <ExchangePage /> }, // 取引所
      ],
    },
    { path: 'battle/:stageId', element: <BattlePage /> }, // 戦闘
    { path: 'scenario/:scenarioId', element: <ScenarioPage /> }, // シナリオ
  ],
  { basename: import.meta.env.BASE_URL },
)
