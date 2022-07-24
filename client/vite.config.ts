import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    outDir: '../dist-client'
  },
  resolve: {
    alias: {
      '@': '/src/'
    }
  }
})
