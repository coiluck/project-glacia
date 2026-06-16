import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import TopPage from '../pages/top/TopPage'
import PartyPage from '../pages/party/PartyPage'
import StoryMapPage from '../pages/story/StoryMapPage'
import BattlePage from '../pages/battle/BattlePage'
import MemberPage from '../pages/member/MemberPage'
import RecruitPage from '../pages/recruit/RecruitPage'
import BasePage from '../pages/base/BasePage'

// ルート定義。新しい画面を足すときはここに追加し、パスは paths.ts に定義する。
// basename は vite の base（/project-glacia/）に合わせる。
export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { index: true, element: <TopPage /> }, // Top（ホーム）
        { path: 'party', element: <PartyPage /> }, // 編成
        { path: 'story', element: <StoryMapPage /> }, // シナリオ：ステージマップ
        { path: 'battle/:stageId', element: <BattlePage /> }, // HEXタイル戦闘
        { path: 'member', element: <MemberPage /> }, // 人員
        { path: 'recruit', element: <RecruitPage /> }, // 召集
        { path: 'base', element: <BasePage /> }, // 基地
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
