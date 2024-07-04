import path from 'path';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(), eslint({ exclude: ['/virtual:/**', 'node_modules/**'] })],
  plugins: [react()],
  test: {
    // Vitest 메소드들을 전역으로 사용할 수 있도록 설정
    globals: true,
    // 테스트 환경 설정을 jsdom 으로 설정
    environment: 'jsdom',
    // 테스트 파일을 찾을 위치 설정
    setupFiles: './src/utils/test/setupTests.js',
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
