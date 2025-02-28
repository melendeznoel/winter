import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [ remix() ],
  ssr: {
    optimizeDeps: {
      include: [ 'lodash' ]
    },
    noExternal: [
      'lodash'
    ]
  }
})
