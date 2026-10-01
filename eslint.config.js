import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist/', '.astro/', 'design-reference/', '.learning/']),
  js.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  astro.configs.recommended,
  {
    plugins: { 'better-tailwindcss': betterTailwindcss },
    settings: {
      'better-tailwindcss': { entryPoint: 'src/styles/global.css' },
    },
    rules: {
      ...betterTailwindcss.configs.correctness.rules,
      'better-tailwindcss/enforce-consistent-class-order': ['error', { order: 'official' }],
      'better-tailwindcss/no-restricted-classes': [
        'error',
        {
          restrict: [
            {
              pattern: '\\[([^\\[\\]]*?)\\](?!:)',
              message:
                'Arbitrary values bypass the design tokens. Add a token to tokens.css instead.',
            },
          ],
        },
      ],
    },
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-param-reassign': ['error', { props: true }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^\\.\\./',
              message: 'Use the @/ alias instead of a parent-relative path.',
            },
          ],
        },
      ],
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-const': 'error',
      'prefer-template': 'error',
    },
  },
]);
