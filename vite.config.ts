import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@common-components': resolve(__dirname, 'src/common-components'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@const': resolve(__dirname, 'src/constants'),
    },
  },
  test: {
    environment: 'happy-dom',
  },
  build: {
    minify: 'esbuild',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'plugins/ai/index': resolve(__dirname, 'src/plugins/ai/index.ts'),
        'angular/index': resolve(__dirname, 'src/angular/index.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
});
