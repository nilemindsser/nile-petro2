import js from '@eslint/js';

export default [
  { ignores: ['design/**', '**/dist/**', 'node_modules/**', '.scratch/**'] },
  js.configs.recommended,
  {
    languageOptions: { ecmaVersion: 2023, sourceType: 'module' },
    rules: { 'no-console': 'off' },
  },
];
