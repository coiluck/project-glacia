import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // 再訪時に新しいビルドを自動で取得・適用する（手動キャッシュバスティング不要）
      registerType: 'autoUpdate',
      // SW 登録コードを自動注入。main.tsx 側に書くものは無し
      injectRegister: 'auto',
      manifest: {
        name: 'Project Glacia',
        short_name: 'Glacia',
        description: '',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'fullscreen',
        orientation: 'landscape',
        icons: [
          { src: '/images/pwa/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/images/pwa/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/images/pwa/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // SPA 用フォールバック。base 配下に合わせる
        navigateFallback: '/project-glacia/index.html',
      },
    }),
  ],
  base: '/project-glacia/',
})
