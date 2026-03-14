import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'ubumwe' with your actual GitHub repository name.
// If you use a custom domain (e.g. ubumwe-quebec.community), set base to '/'
export default defineConfig({
  plugins: [react()],
  base: '/ubumwe/',   // <-- must match your GitHub repo name exactly
})
