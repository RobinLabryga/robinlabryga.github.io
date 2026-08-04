// vite-plugin-pwa's SW generation doesn't fire under Astro's build, so this
// reproduces it manually. Proper fix (@vite-pwa/astro) doesn't support Astro 7 yet.
import { generateSW } from 'workbox-build';

const { count, size, warnings } = await generateSW({
  swDest: 'dist/sw.js',
  globDirectory: 'dist',
  globPatterns: ['**/*.{html,js,css,svg,png,jpg,jpeg,webp,avif,json}'],
  navigateFallback: undefined,
  skipWaiting: true,
  clientsClaim: true,
});

if (warnings.length) {
  console.warn(warnings.join('\n'));
}

console.log(`Generated dist/sw.js, precaching ${count} files (${(size / 1024).toFixed(1)} KiB)`);
