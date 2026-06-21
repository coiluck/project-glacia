import { paths } from '../../router/paths'

// メニューのヘクスマップ。
// 「構造（ヘクス枠＋接続線）」と「内容（ラベル＋遷移先）」を分離する。
// 構造は viewBox 座標に固定し、内容だけをデータで差し替える。
// ラベルは foreignObject 内の HTML として描画するため、文字数が変わっても
// 自動で中央寄せ・折り返しされ、座標直書きによる位置ズレ・はみ出しが起きない。

// 中心を原点(0,0)に揃えたヘクス枠。各ノードは中心座標へ translate するだけでよい。
const HEX_PATH =
  'm -4.719602,-8.188371 -4.731501,8.181412 4.719611,8.18813 9.451112,0.0072 4.73148,-8.181413 -4.71961,-8.188646 z m 0.50643,0.845426 8.465622,0.02325 4.21266,7.342704 -4.25244,7.31945 -8.465122,-0.02274 -4.213181,-7.342704 z'

type MenuNode = {
  id: string
  label: string // TODO: 将来は翻訳用JSONから読み込む
  to: string | null // 遷移先パス。未実装の項目は null
  cx: number
  cy: number
  scale?: number
}

// ヘクスの配置（中心座標）。元のInkscape SVGのレイアウトを踏襲。
const MENU_NODES: MenuNode[] = [
  { id: 'front', label: '前線', to: paths.story, cx: 41.179103, cy: 13.188371 },
  { id: 'party', label: '編成', to: paths.party, cx: 23.451105, cy: 28.188371 },
  { id: 'member', label: '人員', to: paths.member, cx: 58.960512, cy: 28.188371 },
  { id: 'base', label: '基地', to: paths.base, cx: 105.573264, cy: 13.188371, scale: 1.2 },
  { id: 'recruit', label: '招集', to: paths.recruit, cx: 143.82612, cy: 28.188371 },
  { id: 'exchange', label: '取引所', to: null, cx: 183.270233, cy: 28.188371 },
  { id: 'mission', label: '任務', to: null, cx: 163.332543, cy: 13.188371 },
]

// ヘクス同士をつなぐ装飾線（構造）。元SVGの線種をそのまま保持。
type MenuLine = { d: string; cap?: 'round' | 'butt'; join?: 'round' | 'miter'; dash?: string }
const MENU_LINES: MenuLine[] = [
  { d: 'm 116.15942,13.224638 38.26087,-0.108696' },
  { d: 'm 116.10898,13.117343 c 3.41598,0 6.83195,0 10.33336,1.827583 3.50141,1.827584 7.08811,5.482601 10.67489,9.137696' },
  { d: 'm 152.79655,28.181792 c 7.20771,-0.01708 14.41541,-0.03416 21.62312,-0.05124' },
  { d: 'm 95.100737,13.732219 c -6.012117,0.06832 -12.02423,0.136639 -16.874952,1.981301 -4.850722,1.844662 -8.5399,5.465522 -12.229154,9.086457' },
  { d: 'M 50.11235,28.130553 32.28096,28.233031', cap: 'butt', join: 'miter' },
  { d: 'm 49.90739,13.219822 44.875217,-0.03142', cap: 'butt', join: 'miter', dash: '1.6,1.6' },
  { d: 'm 50.061111,13.194203 10.145445,0.01967', cap: 'butt', join: 'miter' },
  { d: 'm 76.34058,13.201993 18.659419,-0.01359', cap: 'butt', join: 'miter' },
]

type Props = {
  onSelect: (to: string) => void
}

export default function MenuMap({ onSelect }: Props) {
  return (
    <svg className="menu-map" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
      {/* 構造: 接続線 */}
      <g className="menu-map-lines" fill="none" stroke="currentColor" strokeWidth={0.8}>
        {MENU_LINES.map((line, i) => (
          <path
            key={i}
            d={line.d}
            strokeLinecap={line.cap ?? 'round'}
            strokeLinejoin={line.join ?? 'round'}
            strokeDasharray={line.dash}
          />
        ))}
      </g>

      {/* 構造（ヘクス枠）＋内容（ラベル）。遷移先があるノードのみクリック可能 */}
      {MENU_NODES.map((node) => {
        const clickable = node.to !== null
        return (
          <g
            key={node.id}
            className={`menu-map-node${clickable ? '' : ' is-disabled'}`}
            transform={`translate(${node.cx} ${node.cy}) scale(${node.scale ?? 1})`}
            role={clickable ? 'button' : undefined}
            aria-label={node.label}
            onClick={clickable ? () => onSelect(node.to as string) : undefined}
          >
            <path className="menu-map-hex" d={HEX_PATH} fill="currentColor" />
            <foreignObject x={-8} y={-6.5} width={16} height={13}>
              <div className="menu-map-label">
                <span>{node.label}</span>
              </div>
            </foreignObject>
          </g>
        )
      })}
    </svg>
  )
}
