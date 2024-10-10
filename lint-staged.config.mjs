export default {
  // 对于 js、ts 脚本文件，应用 eslint
  '**/*.{js,jsx,tsx,ts}': ['eslint --fix'],
  // 对于 css scss 文件，应用 stylelint
  '**/*.{scss,css}': ['stylelint --fix'],
  // Vue 文件由于同时包含模板、样式、脚本，因此 eslint、stylelint 都要使用
  '**/*.vue': ['eslint --fix', 'stylelint --fix'],
  // 用 prettier 修复所有文件的格式
  '**/*': ['prettier --write'],
};
