import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    },
  },
  // core (features + data) は UI・状態・通信層を知らない
  {
    files: ['src/features/**/*.{ts,tsx}', 'src/data/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { regex: '^(react|react-dom|react-router-dom|zustand)(/|$)', message: 'core は React / zustand に依存しない' },
          { regex: '(^|/)(stores|pages|components|hooks|api)(/|$)', message: 'core は UI・状態・通信層に依存しない' },
        ],
      }],
    },
  },
  // worker は core だけを共有する
  {
    files: ['worker/src/**/*.ts'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { regex: '^(\\.\\./)+src/(?!(features|data)/)', message: 'worker からは core (src/features, src/data) のみ参照可' },
        ],
      }],
    },
  },
])
