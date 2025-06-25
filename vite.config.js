import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss/vite';
import { resolve } from 'path';

const pluginDir = __dirname;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    base: './',
    rollupOptions: {
      input: {
        main: resolve(pluginDir, 'src/index.jsx'),
      },
      output: {
        entryFileNames: 'static/js/[name].js',
        chunkFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'static/css/[name].[ext]';
          }
          return 'static/media/[name].[ext]';
        },
      },
    },
    outDir: resolve(pluginDir, 'build'),
    emptyOutDir: true,
    manifest: true,
  },
  server: {
    // Optional: for local development proxy setup
  },
  define: {
    'process.env': {}
  }
});
