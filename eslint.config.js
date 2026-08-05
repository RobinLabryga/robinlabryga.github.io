import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';

export default defineConfig(
  { ignores: ['dist/**', '.astro/**'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  {
    files: ['*.config.mjs', '*.config.js', 'scripts/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
