import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  // 使用相对路径，部署到 GitHub Pages 的项目子目录后，图片和脚本仍能正常加载。
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        chinese: resolve(process.cwd(), 'index.html'),
        english: resolve(process.cwd(), 'en.html')
      }
    }
  }
});
