import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split React + ReactDOM into a separate `vendor` chunk so the main bundle
    // is smaller and the vendor chunk can be cached across deploys (it changes
    // far less often than app code). Lucide icons are tree-shaken per import,
    // so they don't need their own chunk.
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
