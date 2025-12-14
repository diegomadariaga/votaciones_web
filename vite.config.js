import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use root base on Vercel; keep GitHub Pages path when not on Vercel
  base: process.env.VERCEL ? '/' : '/votaciones_web/',
  plugins: [react()],
})
