import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
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
    plugins: { 'jsx-a11y': jsxA11y },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Every image carries an explicit alt decision: a description, or alt=""
      // because it is decorative. With no attribute at all a screen reader falls
      // back to the filename and reads "7.png" aloud.
      'jsx-a11y/alt-text': 'error',
      // This legacy UI still has broadly shaped API/content data. Keep lint focused
      // on correctness while types are tightened incrementally at module boundaries.
      '@typescript-eslint/no-explicit-any': 'off',
      // Barrel files and reusable variant exports are intentional in this project.
      'react-refresh/only-export-components': 'off',
    },
  },
])
