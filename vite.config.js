import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NOTE: Documentation is no longer proxied at runtime. All Unity / Unreal / Game Programming
// Patterns pages are prefetched into static JSON under public/ by the scripts in scripts/
// (see `npm run update:docs`). This keeps the site fully static and deployable to GitHub Pages.

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
})
