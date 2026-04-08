import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'birthday-arft.onrender.com'
    ]
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: [
      'birthday-arft.onrender.com'
    ]
  },
  test: {
    environment: 'jsdom'
  }
})