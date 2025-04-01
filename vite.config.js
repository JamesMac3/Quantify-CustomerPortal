import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 8888, // Change to your desired port
    host:'0.0.0.0' // Expose to the network
  }
})
