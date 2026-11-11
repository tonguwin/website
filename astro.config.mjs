import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://todnguyen.com',
  compressHTML: true,
  integrations: [
    tailwind(),
    // /toon-support is shared by link only, so it stays out of the sitemap.
    sitemap({ filter: (page) => !page.includes('/toon-support') }),
  ],
});

