import { defineConfig } from 'vite';

export default defineConfig({
  // 增加插件的使用
  plugins: [],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'BinaryLogo',
      fileName: 'binary-logo',
    },
    minify: false,
    rollupOptions: {
      external: [
        // 除了 @qx/utils，未来可能还会依赖其他内部模块，不如用正则表达式将 @qx 开头的依赖项一起处理掉
        /@qx.*/,
      ],
    },
  },
});
