import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import tailwinds from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwinds()],
  test: {
    enviroment: 'jsdom',
    globals: true,
  }
})
