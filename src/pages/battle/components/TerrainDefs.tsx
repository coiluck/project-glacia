import { Fragment } from 'react';
import type { TerrainKind } from '../../../features/battle/terrain';
import { TERRAIN_STYLES, TEXTURE_TILE, texturePatternId } from '../terrainStyles';
import type { NoiseLayer } from '../terrainStyles';

// noise の R チャンネルからアルファを作り、RGB は定数で塗りつぶす行列
function matrix({ rgb, gain, bias }: NoiseLayer): string {
  const [r, g, b] = rgb;
  return `0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} ${gain} 0 0 0 ${bias}`;
}

// 全地形のテクスチャ定義。HexGrid の <svg> 直下に1度だけ置く
export default function TerrainDefs() {
  const kinds = Object.keys(TERRAIN_STYLES) as TerrainKind[];
  return (
    <defs>
      {kinds.map((kind) => {
        const { top, noise } = TERRAIN_STYLES[kind];
        return (
          <Fragment key={kind}>
            <filter
              id={`noise-${kind}`}
              filterUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={TEXTURE_TILE}
              height={TEXTURE_TILE}
            >
              {/* フィルタープリミティブは <filter> の直下に並べる（<g> で囲むと無視される） */}
              {noise.map((layer, i) => (
                <Fragment key={i}>
                  <feTurbulence
                    type={layer.type}
                    baseFrequency={layer.freq}
                    numOctaves={layer.octaves}
                    seed={layer.seed}
                    stitchTiles="stitch"
                    result={`n${i}`}
                  />
                  <feColorMatrix in={`n${i}`} type="matrix" values={matrix(layer)} result={`l${i}`} />
                </Fragment>
              ))}
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                {noise.map((_, i) => (
                  <feMergeNode key={i} in={`l${i}`} />
                ))}
              </feMerge>
            </filter>
            <pattern
              id={texturePatternId(kind)}
              patternUnits="userSpaceOnUse"
              width={TEXTURE_TILE}
              height={TEXTURE_TILE}
            >
              <rect
                width={TEXTURE_TILE}
                height={TEXTURE_TILE}
                fill={top}
                filter={`url(#noise-${kind})`}
              />
            </pattern>
          </Fragment>
        );
      })}
    </defs>
  );
}
