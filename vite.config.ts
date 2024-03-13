import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/projects/investment-calculator/",

  define: {
    // Fix for "global is not defined" error when using use-dark-mode
    global: {},
  },
})
