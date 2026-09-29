import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jesushernan.com',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    locales: ['es', 'en', 'pt'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] }
});
