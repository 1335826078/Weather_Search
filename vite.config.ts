import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // 第三个参数传 '' 表示读取全部变量（含无 VITE_ 前缀的）
  const env = loadEnv(mode, process.cwd(), '')

  const appid = env.WEATHER_APPID
  const appsecret = env.WEATHER_APPSECRET

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        // 前端请求 /api?version=v63&city=北京，直接转发到天气 API 并注入密钥
        '/api': {
          target: 'http://pddfps.tianqiapi.com',
          changeOrigin: true,
          rewrite: (path) => {
            // 分离路径和查询参数
            const [urlPath, query = ''] = path.split('?')
            const params = new URLSearchParams(query)
            // 注入密钥（覆盖可能存在的占位值）
            if (appid && appsecret) {
              params.set('appid', appid)
              params.set('appsecret', appsecret)
            }
            return `${urlPath}?${params.toString()}`
          },
        },
      },
    },
    test: {
      environment: 'node',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
    },
  }
})
