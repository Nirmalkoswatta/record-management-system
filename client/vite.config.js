import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Same-origin /api in dev, so the client never hardcodes the backend URL
  server: { proxy: { '/api': 'http://localhost:3000' } },
})
