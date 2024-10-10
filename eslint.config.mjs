// @ts-check
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineFlatConfig } from 'eslint-define-config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/// <reference types="@eslint-types/typescript-eslint" />

export default defineFlatConfig([
  // 插件的预设配置放在最前面
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      // 配置全局变量
      globals: {
        ...globals.browser,
        ...globals.node,
        InstanceType: 'readonly',
        NodeJS: 'readonly',
      },
    },
  },
  {
    // 因为demo使用了auto-imports插件，所以需要把自动导入的变量加到全局变量配置里
    files: ['demo/src/**/*'],
    languageOptions: {
      // 配置全局变量
      globals: {
        ref: 'readonly',
        onMounted: 'readonly',
        nextTick: 'readonly',
      },
    },
  },
  // 需要忽略的文件
  {
    ignores: ['**/*.d.ts', '**/dist/*'],
  },
  // 一些自定义规则
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      semi: 'error',
      'prefer-const': 'error',
    },
  },
  // 匹配 vue、ts 文件，使用 tseslint.parser
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: './tsconfig.eslint.json',
        extraFileExtensions: ['vue'],
      },
    },
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      // prettier 配置为警告而不是报错
      'prettier/prettier': ['warn'],
    },
  },
]);
