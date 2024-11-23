import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,

    proxy: {
      "/api": {
        target: "http://localhost:5000", // ensure this is http if your server doesn’t support https
        changeOrigin: true,
        secure: false,
      },
    },
  },


})
