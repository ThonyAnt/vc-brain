import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  // Live brain API (real OpenAI chat + learning). Run `npm run api` in brain/.
  // If it's not running, the client falls back to local stubs.
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8790',
    },
  },
})
