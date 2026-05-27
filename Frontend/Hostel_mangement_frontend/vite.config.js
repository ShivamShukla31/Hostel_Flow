import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = env.VITE_API_URL

  return defineConfig({
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
      include: ['recharts']
    },
    server: apiUrl
      ? {
          proxy: {
            '/api': {
              target: apiUrl,
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : {},
  })
}
