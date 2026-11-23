import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` must match the repo name so the site works at
// https://kuhu-kavya.github.io/Kuhu_website/
export default defineConfig({
  plugins: [react()],
  base: '/Kuhu_website/',
})
