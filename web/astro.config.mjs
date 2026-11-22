import { defineConfig } from 'astro/config';
export default defineConfig({ output: 'static', trailingSlash: 'always', compressHTML: false,
  vite: { build: { sourcemap: false } }, devToolbar: { enabled: false } });
