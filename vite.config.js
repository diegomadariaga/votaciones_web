import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/votaciones_web/', // <- cambia 'votaciones' si tu repo tiene otro nombre
  plugins: [react()],
})
