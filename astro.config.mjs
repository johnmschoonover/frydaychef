import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import AstroPWA from '@vite-pwa/astro'

export default defineConfig({
  site: 'https://frydaychef.net',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      scope: '/',
      workbox: {
        navigateFallback: null,
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Fryday Chef',
        short_name: 'Fryday Chef',
        description: 'Fryday Chef serves cozy, modern recipes and kitchen inspiration.',
        theme_color: '#f8f7ff',
        background_color: '#f8f7ff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ]
})
