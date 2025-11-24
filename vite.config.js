import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // GitHub Pagesの場合、リポジトリ名に変更: '/skillchain-app/'
})
