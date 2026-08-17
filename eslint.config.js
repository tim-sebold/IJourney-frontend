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
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // This legacy UI still has broadly shaped API/content data. Keep lint focused
      // on correctness while types are tightened incrementally at module boundaries.
      '@typescript-eslint/no-explicit-any': 'off',
      // Barrel files and reusable variant exports are intentional in this project.
      'react-refresh/only-export-components': 'off',
    },
  },
])
