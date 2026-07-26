// 地形の見た目の定義
// ロジック側の定義は features/battle/terrain.ts
import type { TerrainKind } from '../../features/battle/terrain';
import type { StageTile } from '../../features/battle/types';

// テクスチャパターン1枚の辺の長さ（設計座標）。SIZE=90 のタイル約2.5枚分
export const TEXTURE_TILE = 256;

// テクスチャパターンの id。TerrainDefs が定義し、天面の fill から参照する
export const texturePatternId = (kind: TerrainKind) => `tex-${kind}`;
export const terrainFill = (kind: TerrainKind) => `url(#${texturePatternId(kind)})`;

// テクスチャのノイズ1層。
// freq（baseFrequency）が小さいほど大きなムラ、大きいほど細かい粒。
// dark / light は「重ねる色」と「その色が出る強さ」。
// alpha = gain * noise + bias なので、bias を下げると色が出にくく、gain を上げると輪郭が硬くなる。
export interface NoiseLayer {
  type: 'fractalNoise' | 'turbulence';
  freq: string;
  octaves: number;
  seed: number;
  rgb: [number, number, number];
  gain: number;
  bias: number;
}

// タイル1枚を構成する層。下から順に並べる
// height は通常のタイルの厚み（HexGrid の THICKNESS）を1とした倍率
export interface TileLayer {
  height: number;
  terrain: TerrainKind; // 天面・側面の塗りに使う地形
  opacity?: number;
}

export interface TerrainStyle {
  top: string; // 天面のベース色。テクスチャはこの上に乗る
  side: string; // 側面（厚み）の色
  noise: NoiseLayer[];
  // タイルの積み方。省略時は自分の地形1層・高さ1
  layers?: TileLayer[];
}

export const TERRAIN_STYLES: Record<TerrainKind, TerrainStyle> = {
  grass: {
    top: '#5f8f46',
    side: '#3d5c2c',
    noise: [
      { type: 'fractalNoise', freq: '0.05', octaves: 4, seed: 12, rgb: [0.1, 0.21, 0.07], gain: 1.5, bias: -0.55 },
      { type: 'fractalNoise', freq: '0.3', octaves: 3, seed: 4, rgb: [0.56, 0.74, 0.33], gain: 1.3, bias: -0.82 },
    ],
  },
  dirt: {
    top: '#8a6844',
    side: '#5b4429',
    noise: [
      { type: 'fractalNoise', freq: '0.04', octaves: 4, seed: 31, rgb: [0.28, 0.18, 0.1], gain: 1.5, bias: -0.5 },
      { type: 'fractalNoise', freq: '0.22', octaves: 3, seed: 9, rgb: [0.7, 0.57, 0.37], gain: 1.2, bias: -0.78 },
    ],
  },
  sand: {
    top: '#d9c184',
    side: '#a08c5c',
    noise: [
      { type: 'fractalNoise', freq: '0.012 0.09', octaves: 3, seed: 21, rgb: [0.7, 0.58, 0.36], gain: 1.4, bias: -0.62 },
      { type: 'fractalNoise', freq: '0.55', octaves: 2, seed: 2, rgb: [0.99, 0.95, 0.78], gain: 0.9, bias: -0.6 },
    ],
  },
  stone: {
    top: '#8b8d8f',
    side: '#5c5e60',
    noise: [
      { type: 'turbulence', freq: '0.03', octaves: 5, seed: 77, rgb: [0.28, 0.29, 0.31], gain: 2.0, bias: -0.15 },
      { type: 'fractalNoise', freq: '0.35', octaves: 3, seed: 6, rgb: [0.84, 0.86, 0.88], gain: 1.4, bias: -0.85 },
    ],
  },
  snow: {
    top: '#e3ebf2',
    side: '#9fb0bf',
    noise: [
      { type: 'fractalNoise', freq: '0.03', octaves: 4, seed: 44, rgb: [0.62, 0.7, 0.8], gain: 1.1, bias: -0.5 },
      { type: 'fractalNoise', freq: '0.6', octaves: 2, seed: 15, rgb: [1, 1, 1], gain: 1.2, bias: -0.72 },
    ],
  },
  water: {
    top: '#2f6ea8',
    side: '#1e4a72',
    noise: [
      { type: 'fractalNoise', freq: '0.015 0.11', octaves: 3, seed: 5, rgb: [0.05, 0.2, 0.42], gain: 1.5, bias: -0.55 },
      { type: 'fractalNoise', freq: '0.02 0.16', octaves: 2, seed: 19, rgb: [0.72, 0.92, 1], gain: 2.2, bias: -1.55 },
    ],
    // 川底の土の上に半透明の水を重ねて底が透けて見えるようにする
    layers: [
      { height: 0.3, terrain: 'dirt' },
      { height: 0.5, terrain: 'water', opacity: 0.7 },
    ],
  },
  lava: {
    top: '#7a2410',
    side: '#3d1109',
    noise: [
      { type: 'fractalNoise', freq: '0.045', octaves: 4, seed: 66, rgb: [0.09, 0.03, 0.02], gain: -2.2, bias: 1.15 },
      { type: 'fractalNoise', freq: '0.045', octaves: 4, seed: 66, rgb: [1, 0.52, 0.08], gain: 3.4, bias: -1.95 },
      { type: 'fractalNoise', freq: '0.4', octaves: 3, seed: 8, rgb: [0.05, 0.02, 0.01], gain: 1.1, bias: -0.72 },
    ],
    // 通行不可が分かるように通常より低くする
    layers: [{ height: 0.8, terrain: 'lava' }],
  },
  void: {
    top: '#15171e',
    side: '#08090d',
    noise: [
      { type: 'fractalNoise', freq: '0.06', octaves: 5, seed: 99, rgb: [0.01, 0.01, 0.03], gain: 1.6, bias: -0.5 },
      { type: 'fractalNoise', freq: '0.06', octaves: 5, seed: 99, rgb: [0.36, 0.34, 0.48], gain: 1.0, bias: -0.78 },
    ],
  },
};

// タイル1枚の層を下から順に返す
export function tileLayers(tile: StageTile): TileLayer[] {
  // 台地は地形の見た目のまま上に伸ばす
  const elevation = tile.elevation ?? 0;
  if (elevation > 0) return [{ height: 1 + elevation, terrain: tile.terrain }];
  return TERRAIN_STYLES[tile.terrain].layers ?? [{ height: 1, terrain: tile.terrain }];
}

// タイル1枚の総高さ（THICKNESS を1とした倍率）
export function tileHeight(tile: StageTile): number {
  return tileLayers(tile).reduce((sum, layer) => sum + layer.height, 0);
}
