import StageNode from './components/StageNode'

// シナリオ：ステージマップ画面。ノードを選ぶと戦闘(HEXタイル)へ遷移する。
export default function StoryMapPage() {
  // TODO: data/stages から読み込む。
  const stages = ['1-5', '1-6', '1-7', '1-8']
  return (
    <div className="page page-story">
      <h1>STORY</h1>
      <div className="story-map">
        {stages.map((id) => (
          <StageNode key={id} stageId={id} />
        ))}
      </div>
    </div>
  )
}
