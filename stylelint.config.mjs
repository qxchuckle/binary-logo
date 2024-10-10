// @ts-check
import defineConfig from 'stylelint-define-config';

/// <reference types="@stylelint-types/stylelint-scss" />

export default defineConfig({
  // 继承的预设，这些预设包含了规则集插件
  extends: [
    // 基本 scss 规则
    'stylelint-config-standard-scss',
    // scss vue 规则
    'stylelint-config-recommended-vue/scss',
    // 样式属性顺序规则
    'stylelint-config-recess-order',
  ],
  plugins: [
    // 代码风格插件，应该使用 prettier 管理代码风格
    // '@stylistic/stylelint-plugin',
  ],
  rules: {
    // 自定义规则集的启用 / 禁用
    // '@stylistic/max-line-length': 100,
    'no-empty-source': null,
  },
  // glob 匹配排除的文件
  ignoreFiles: ['**/dist/*', '**/node_modules/*', '*.gitignore', '*.npmrc'],
  overrides: [
    {
      files: ['*.html', '**/*.html'],
      customSyntax: 'postcss-html',
    },
  ],
});
