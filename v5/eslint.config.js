import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default [
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser, extraFileExtensions: ['.vue'] } } },
  { files: ['**/*.{js,ts,vue}'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { window: 'readonly', document: 'readonly', HTMLElement: 'readonly', HTMLImageElement: 'readonly', Event: 'readonly', KeyboardEvent: 'readonly', IntersectionObserver: 'readonly', setTimeout: 'readonly', setInterval: 'readonly', clearInterval: 'readonly' } }, rules: { 'vue/multi-word-component-names': 'off', 'vue/max-attributes-per-line': 'off', 'vue/singleline-html-element-content-newline': 'off', 'vue/html-self-closing': 'off' } },
]
