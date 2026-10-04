import { Shard } from './shapes'

// 鉱脈の結晶。[x, y, 幅, 高さ, 傾き]。豊かな鉱脈ほど大きく多い
const SPOTS: Record<1 | 2, number[][]> = {
  1: [[-14, 6, 9, 20, -2], [4, 2, 11, 28, 2], [18, 9, 8, 15, 3]],
  2: [[-24, 4, 9, 18, -3], [-10, 8, 11, 30, -1], [6, 0, 13, 40, 2], [20, 8, 10, 24, 4], [32, 2, 7, 13, 2]],
}

// 建物のない資源のマスの結晶。原点がマスの天面の中心
export default function OreArt({ step, cold }: { step: 1 | 2; cold: boolean }) {
  const rich = step === 2
  return (
    <g className={`base-ore${cold ? ' is-cold' : ''}`}>
      <ellipse className="base-ore-glow" cx={2} cy={4} rx={rich ? 46 : 32} ry={rich ? 22 : 16} />
      <polygon className="base-ore-rock" points="-30,10 -22,2 -12,6 -16,14" />
      <polygon className="base-ore-rock" points="24,14 32,8 40,12 34,18" />
      {SPOTS[step].map(([x, y, w, h, tilt]) => (
        <Shard key={x} x={x} y={y} w={w} h={h} tilt={tilt} />
      ))}
      {rich && <path className="base-ore-glint" d="M6,-44 l2,6 6,2 -6,2 -2,6 -2,-6 -6,-2 6,-2Z" />}
    </g>
  )
}
