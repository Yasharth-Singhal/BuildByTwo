import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const pageDirectories = new Set([
  '/services', '/work', '/about', '/contact', '/admin/login', '/admin/dashboard',
  '/work/brighter-days-coffee', '/work/luma-wellness', '/work/common-ground',
])

function directoryRedirects() {
  return {
    name: 'buildbytwo-directory-redirects',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const [pathname, query] = (request.url || '/').split('?')
        if (!pageDirectories.has(pathname)) return next()
        response.statusCode = 308
        response.setHeader('Location', `${pathname}/${query ? `?${query}` : ''}`)
        response.end()
      })
    },
  }
}

export default defineConfig({
  plugins: [directoryRedirects(), react()],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services/index.html'),
        work: resolve(__dirname, 'work/index.html'),
        brighterDays: resolve(__dirname, 'work/brighter-days-coffee/index.html'),
        luma: resolve(__dirname, 'work/luma-wellness/index.html'),
        commonGround: resolve(__dirname, 'work/common-ground/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        adminLogin: resolve(__dirname, 'admin/login/index.html'),
        adminDashboard: resolve(__dirname, 'admin/dashboard/index.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
})
