import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  
  base: '/',
  plugins: [react()],
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
