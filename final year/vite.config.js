import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': 'https://medicare-hospital-management-system-3.onrender.com', // Change 5000 to your backend port if different
    },
  },
})