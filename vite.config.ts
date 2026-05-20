import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const AIHOT_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/aihot-api': {
        target: 'https://aihot.virxact.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aihot-api/, '/api/public'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('User-Agent', AIHOT_USER_AGENT)
          })
        }
      }
    }
  },
  preview: {
    proxy: {
      '/aihot-api': {
        target: 'https://aihot.virxact.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aihot-api/, '/api/public'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('User-Agent', AIHOT_USER_AGENT)
          })
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
