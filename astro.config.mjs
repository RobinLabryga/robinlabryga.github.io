import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { VitePWA } from 'vite-plugin-pwa';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://robinlabryga.github.io',
  output: 'static',
  prefetch: true,
  integrations: [
    icon(),
    sitemap({
      filter: (page) =>
        !page.endsWith('/404.html') && !page.includes('/papers/'),
      customPages: ['https://robinlabryga.github.io/GeoProdViz2D/'],
    }),
  ],
  vite: {
    plugins: [
      // Only produces manifest.webmanifest/registerSW.js; sw.js is generated
      // separately, see scripts/generate-sw.mjs.
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: {
          name: 'Robin Labryga - Personal Website',
          short_name: 'Robin Labryga',
          description: 'Personal website showcasing random things I do.',
          start_url: '/',
          display: 'standalone',
          background_color: '#080a0c',
          theme_color: '#3B82F6',
          orientation: 'portrait-primary',
          icons: [
            {
              src: '/assets/favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: '/assets/favicon-maskable.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'maskable',
            },
            {
              src: '/assets/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/assets/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/assets/icon-maskable-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/assets/icon-maskable-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          categories: ['portfolio', 'personal', 'professional'],
          lang: 'en',
          dir: 'ltr',
        },
      }),
    ],
  },
});
