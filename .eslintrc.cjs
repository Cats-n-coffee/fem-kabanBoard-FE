/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:vue/vue3-strongly-recommended',
  ],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
    {
      files: ['src/*.ts', 'src/*.ts', 'src/*.vue'],
      rules: {
        quotes: ['warning', 'double'],
        "vue/max-attributes-per-line": ["error", {
          "singleline": {
            "max": 2
          },      
          "multiline": {
            "max": 1
          }
        }]
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
