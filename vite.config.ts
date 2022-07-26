import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: 'https://us-central1-stocks-tracker-dev.cloudfunctions.net/',
        changeOrigin: true,
        rewrite: (path) => {
          console.log("Path", path)
          return path.replace(/^\/api/, '')
        }
      }
    }
  }
})
