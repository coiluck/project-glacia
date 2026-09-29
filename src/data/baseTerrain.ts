// 基地の盤面の地形。全員共通
// 書き方は battleStages/grid.ts と同じ）
import { axialKey } from '../features/battle/hex';
import type { Axial } from '../features/battle/hex';
import { cells } from './battleStages/grid';

export type BaseTileKind =
  | 'ice'       // 普通の氷原
  | 'resource'  // 資源のあるマス。採掘場はここにだけ置ける
  | 'blocked'   // 岩山や氷の割れ目。何も置けない
  | 'tower'     // 暖房塔
  | 'refinery'; // 精錬所

const TILE_CHARS: Record<string, BaseTileKind> = {
  '.': 'ice',
  o: 'resource',
  x: 'blocked',
  T: 'tower',
  R: 'refinery',
};

const MAP = [
  '    . . o . . x . o',
  '   . x . . o . . o .',
  '  . . . . . . o . x .',
  ' x . o . . T R . o . .',
  '  . . . o . . . . . .',
  '   . o . . x . . . .',
  '    x . . . o . . .',
];

export interface BaseTile {
  pos: Axial;
  kind: BaseTileKind;
}

export const baseTiles: BaseTile[] = cells(MAP).map(({ pos, ch }) => {
  const kind = TILE_CHARS[ch];
  if (!kind) throw new Error(`基地の地形の文字が不正: '${ch}'`);
  return { pos, kind };
});

// axialKey -> マス
export const baseTileMap: Map<string, BaseTile> = new Map(baseTiles.map((t) => [axialKey(t.pos), t]));

function posOf(kind: BaseTileKind): Axial {
  const tile = baseTiles.find((t) => t.kind === kind);
  if (!tile) throw new Error(`基地の地形に ${kind} が無い`);
  return tile.pos;
}

export const TOWER_POS: Axial = posOf('tower');
export const REFINERY_POS: Axial = posOf('refinery');
