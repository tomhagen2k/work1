import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'dist/**',
      'android/**',
      'node_modules/**',
      '.tools/**',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/core/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            'pixi.js',
            '@capacitor/*',
            '../application/*',
            '../services/*',
            '../ui/*',
            '../input/*',
            '../rendering/*',
            '../content/*',
          ],
        },
      ],
      'no-restricted-globals': [
        'error',
        'window',
        'document',
        'Date',
        'performance',
        'localStorage',
        'fetch',
        'setInterval',
        'setTimeout',
        'requestAnimationFrame',
      ],
    },
  },
];
