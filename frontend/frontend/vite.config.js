import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { configDefaults } from 'vitest/config';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  
  base: '/',
  plugins: [react(), viteCommonjs()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', 
    exclude: [...configDefaults.exclude, 'e2e', 'dist', '**/*.e2e-spec.ts'],
  },
  // local server will now run at http://localhost:5173/
  server: {

    open: true, 
    port: 5173, 
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias '@' to 'src' directory
    },
  },
})
