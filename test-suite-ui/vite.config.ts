import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages, use the repository name as base
  // If deploying to https://username.github.io/repo-name/, use '/repo-name/'
  // If deploying to https://username.github.io/, use '/'
  base: process.env.GITHUB_REPOSITORY 
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : './',
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure all assets use relative paths
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})

