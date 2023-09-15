import preact from '@preact/preset-vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve('src/'),
    },
  },
  build: {
    minify: true,
    manifest: true,
    emptyOutDir: true,
  },
  plugins: [preact()],
});
