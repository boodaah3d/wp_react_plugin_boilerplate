import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const pluginDir = __dirname;

export default defineConfig({
  plugins: [
    react(),
    // For Tailwind CSS v4.1, you DO NOT need to import/add `tailwindcss` here.
    // Vite automatically processes CSS and applies Tailwind based on its configuration
    // and where you use Tailwind classes in your content files.
  ],
  css: {
    // This is optional, but if you needed to add other PostCSS plugins
    // or configure PostCSS manually, you could do it here.
    // For Tailwind v4, usually not needed unless you have other specific PostCSS needs.
    // postcss: {
    //   plugins: [
    //     require('tailwindcss'),
    //     // other postcss plugins if needed
    //   ],
    // },
  },
  build: {
    base: './',
    rollupOptions: {
      input: {
        main: resolve(pluginDir, 'src/index.jsx'),
        admin: resolve(pluginDir, 'src/admin/index.jsx'),
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
