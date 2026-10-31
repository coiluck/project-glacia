import { defineConfig } from 'vitest/config'

// テストは src/data と src/features の純関数だけを見るので、PWA や React のプラグインを積んだ vite.config.ts は読まない
// features のテストはソースの隣（src/features/**）、data の整合性のテストは tests/data/ に置く
export default defineConfig({
  test: {
    include: ['src/features/**/*.test.ts', 'tests/data/**/*.test.ts'],
  },
})
