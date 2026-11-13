import { defineConfig } from 'vitest/config'

// テストは src/data と src/features の純関数だけを見るので、PWA や React のプラグインを積んだ vite.config.ts は読まない
// features のテストはソースの隣（src/features/**）、data の整合性のテストは tests/data/ に置く
// pages の中でも React に触れない純関数（pages/battle/attackFx.ts）は、同じくソースの隣に置く
export default defineConfig({
  test: {
    include: ['src/features/**/*.test.ts', 'src/pages/**/*.test.ts', 'tests/data/**/*.test.ts'],
  },
})
