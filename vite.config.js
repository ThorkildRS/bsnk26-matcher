import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/bsnk26-matcher/',
  server: {
    port: 3000,
    open: true
  }
})
