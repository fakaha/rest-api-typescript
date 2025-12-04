import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js,
      '@typescript-eslint': tseslint.plugin
    },
    extends: ['js/recommended'],
    languageOptions: { parser: tseslint.parser, globals: { ...globals.browser, ...globals.node } },
    ignorePatterns: ['**/build/*', '**/node_modules/*', '**/public/*']
  },
  tseslint.configs.recommended
])
