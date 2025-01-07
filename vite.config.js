import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://sphurti-backend.onrender.com', // Backend server URL
        changeOrigin: true, // Changes the origin of the host header to the target URL
      },
    },
  },
});
