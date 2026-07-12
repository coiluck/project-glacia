// HEX盤面の座標
export interface Axial {
  q: number;
  r: number;
}

export interface Pixel {
  x: number;
  y: number;
}

// Map/Set のキー用文字列
export function axialKey(c: Axial): string {
  return `${c.q},${c.r}`;
}

// 右隣から反時計回りの6方向
const DIRECTIONS: readonly Axial[] = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

export function neighbors(c: Axial): Axial[] {
  return DIRECTIONS.map((d) => ({ q: c.q + d.q, r: c.r + d.r }));
}

// 2座標間のHEX距離
export function distance(a: Axial, b: Axial): number {
  const dq = a.q - b.q;
  const dr = a.r - b.r;
  return (Math.abs(dq) + Math.abs(dr) + Math.abs(dq + dr)) / 2;
}

// center から半径 radius 以内の全座標
// 盤面上に存在するかは考慮しない
export function coordsInRange(center: Axial, radius: number): Axial[] {
  const result: Axial[] = [];
  for (let q = -radius; q <= radius; q++) {
    const rMin = Math.max(-radius, -q - radius);
    const rMax = Math.min(radius, -q + radius);
    for (let r = rMin; r <= rMax; r++) {
      result.push({ q: center.q + q, r: center.r + r });
    }
  }
  return result;
}

// 移動範囲
// 盤面に存在するか・他ユニットが居ないかの判定は呼び出し側がisPassableに含めて渡す。
export function reachable(
  start: Axial,
  move: number,
  isPassable: (c: Axial) => boolean,
): Axial[] {
  const visited = new Set<string>([axialKey(start)]);
  const result: Axial[] = [];
  let frontier: Axial[] = [start];
  for (let step = 0; step < move; step++) {
    const next: Axial[] = [];
    for (const c of frontier) {
      for (const n of neighbors(c)) {
        const key = axialKey(n);
        if (visited.has(key) || !isPassable(n)) continue;
        visited.add(key);
        result.push(n);
        next.push(n);
      }
    }
    frontier = next;
  }
  return result;
}

// size は六角形の中心から頂点までの距離。
// 戻り値は六角形の中心座標
export function hexToPixel(c: Axial, size: number): Pixel {
  return {
    x: size * Math.sqrt(3) * (c.q + c.r / 2),
    y: size * 1.5 * c.r,
  };
}
