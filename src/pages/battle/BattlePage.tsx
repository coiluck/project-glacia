import { useParams } from 'react-router-dom'
import HexGrid from './components/HexGrid'

// ゲーム本体：HEXタイル戦闘画面。:stageId のステージを読み込んで戦闘を進行する。
export default function BattlePage() {
  const { stageId } = useParams<{ stageId: string }>()
  return (
    <div className="page page-battle">
      <h1>BATTLE — STAGE {stageId}</h1>
      <HexGrid />
    </div>
  )
}
