import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import AstroPWA from '@vite-pwa/astro'
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'

export default defineConfig({
  site: 'https://frydaychef.net',
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    react(),
    markdoc(),
    keystatic(),
    AstroPWA({
      registerType: 'autoUpdate',
      scope: '/',
      workbox: {
        navigateFallback: null,
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        globIgnores: ['**/*keystatic*.js'],
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
