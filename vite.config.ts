import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    proxy: {
      "/files": "https://webapi.115.com",
      "/web": "https://115.com",
      "/app": "https://proapi.115.com/",
      "/?ac=space&ct=offline": "https://115.com/",
    },
  },
})
