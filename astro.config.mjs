import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { VitePWA } from 'vite-plugin-pwa';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://robinlabryga.github.io',
  output: 'static',
  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.endsWith('/404.html'),
      customPages: ['https://robinlabryga.github.io/GeoProdViz2D/'],
    }),
  ],
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: {
          name: 'Robin Labryga - Personal Website',
          short_name: 'Robin Labryga',
          description: 'Personal website showcasing random things I do.',
          start_url: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#3B82F6',
          orientation: 'portrait-primary',
          icons: [
            {
              src: '/assets/favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any maskable',
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
