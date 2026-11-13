import { defineConfig } from 'vitest/config'

// レベルデザインの調査用。pnpm test には入れない（時間がかかり、合否も出さない）
// npx vitest run --config tests/level-design/vitest.config.ts            … 全部（数分）
// npx vitest run --config tests/level-design/vitest.config.ts -t 最低     … 勝てる最低 Lv の表だけ
// SEEDS=100 で試行回数を変えられる。結果は tests/level-design/out/ に書く
export default defineConfig({
  test: {
    root: import.meta.dirname,
    include: ['**/*.sim.ts'],
    testTimeout: 0,
    hookTimeout: 0,
  },
})
