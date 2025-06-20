import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { resolve } from 'path';

const pluginDir = __dirname;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // This needs to match the path where the plugin build folder will be accessible
    // from the WordPress root. e.g., /wp-content/plugins/your-plugin-slug/build/
    base: './', // Use relative path for assets so it works regardless of WP install path
    rollupOptions: {
      input: {
        main: resolve(pluginDir, 'src/index.jsx'), // Entry point for your React app
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
